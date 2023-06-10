import * as core from '@actions/core'
import {globSync} from 'glob'
import fs from 'fs'
import {
  PutObjectCommand,
  type PutObjectCommandOutput,
  S3Client
} from '@aws-sdk/client-s3'
import {createHash} from 'crypto'

export interface RuleMapping {
  guardFilePath: string
  reportsOn: string[]
  controls: string[]
}

export interface RuleSetParams {
  owner: string
  ruleSetName: string
  version: string
  description: string
  contact: string
  mappings: RuleMapping[]
}

export class RuleSet {
  static findRuleSets(dir: string): RuleSet[] {
    const ret: RuleSet[] = []
    const files = globSync(`${dir}/**/*.json`)
    for (const f of files) {
      core.debug(`Aggregating file ${f}`)
      const ruleSetJson = JSON.parse(fs.readFileSync(f, 'utf-8'))
      if (
        !!ruleSetJson.owner &&
        !!ruleSetJson.ruleSetName &&
        !!ruleSetJson.version &&
        !!ruleSetJson.contact &&
        !!ruleSetJson.description &&
        !!ruleSetJson.mappings
      ) {
        ret.push(new RuleSet(ruleSetJson as RuleSetParams))
      }
    }
    return ret
  }

  readonly contact: string
  readonly description: string
  readonly mappings: RuleMapping[]
  readonly owner: string
  readonly ruleSetName: string
  readonly version: string
  readonly guardCode: string
  constructor(params: RuleSetParams) {
    this.contact = params.contact
    this.description = params.description
    this.mappings = params.mappings
    this.owner = params.owner
    this.ruleSetName = params.ruleSetName
    this.version = params.version
    this.guardCode = this.aggregateRuleContent()
  }

  private buildCustomMessage(ruleSetName: string, controls: string): string {
    let ret = `    Guard Rule Set: ${ruleSetName}\n`
    ret += `    Controls: ${controls}\n`
    return ret
  }
  aggregateRuleContent(): string {
    let ret = ''
    for (const ruleMapping of this.mappings) {
      let ruleContent = ''
      try {
        ruleContent = fs.readFileSync(ruleMapping.guardFilePath, 'utf-8')
      } catch (err) {
        core.error(`Error encountered: ${err}`)
        core.setFailed(
          `Action Failed, unable to read rule from path: ${ruleMapping.guardFilePath} described in ${this.ruleSetName}`
        )
      }
      if (!ruleContent.split('\n')[0].trim().includes('## SKIP')) {
        const additionalInformationAddedContent = ruleContent.replace(
          '<<\n',
          `<<\n${this.buildCustomMessage(
            this.ruleSetName,
            ruleMapping.controls.join(', ')
          )}`
        )
        ret += `${additionalInformationAddedContent}\n`
      }
    }
    return ret
  }

  async publishToS3(
    bucketName: string,
    markAsLatest = false,
    s3Client: S3Client | undefined = undefined
  ): Promise<void> {
    if (s3Client === undefined) {
      s3Client = new S3Client({})
    }
    const promises: Promise<PutObjectCommandOutput>[] = []
    promises.push(
      s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Body: this.guardCode,
          Key: `${this.version}/${this.ruleSetName}.guard`
        })
      )
    )

    promises.push(
      s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Body: createHash('sha256').update(this.guardCode).digest('hex'),
          Key: `${this.version}/${this.ruleSetName}.sha256`
        })
      )
    )

    if (markAsLatest) {
      promises.push(
        s3Client.send(
          new PutObjectCommand({
            Bucket: bucketName,
            Body: this.guardCode,
            Key: `latest/${this.ruleSetName}.guard`
          })
        )
      )

      promises.push(
        s3Client.send(
          new PutObjectCommand({
            Bucket: bucketName,
            Body: createHash('sha256').update(this.guardCode).digest('hex'),
            Key: `latest/${this.ruleSetName}.sha256`
          })
        )
      )
    }
    await Promise.all(promises)
    core.setOutput('Published Files', promises.length / 2)
    core.notice(`Successfully pushed ${this.ruleSetName} to ${bucketName}`)
  }
}
