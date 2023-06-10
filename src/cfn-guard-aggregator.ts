import fetch from 'node-fetch'
import {globSync} from 'glob'
import fs from 'fs'
import {RuleMapping, RuleSet} from './rule-set'

export interface CfnGuardAggregatorParam {
  readonly name: string
  readonly contact: string
  readonly ruleOwner: string
  readonly version: string
  readonly description: string
}

/**
 * Class aggregates all rules and converts them into a RuleSet
 */
export class CfnGuardAggregator {
  private readonly name: string
  private readonly contact: string
  private readonly ruleOwner: string
  private readonly version: string
  private readonly description: string

  constructor(params: CfnGuardAggregatorParam) {
    this.name = params.name
    this.contact = params.contact
    this.ruleOwner = params.ruleOwner
    this.version = params.version
    this.description = params.description
    // this.install();
  }

  /**
   * Get all CloudFormation resource types.  Example of a resource type is `AWS::S3::Bucket`
   * @private
   */
  private async getResourceTypes(): Promise<string[]> {
    const response = await fetch(
      'https://cloudformation-schema.s3.us-west-2.amazonaws.com/resourcetypelist.json'
    )
    return (await response.json()) as string[]
  }

  /**
   *
   * @param dir Directory to aggregate files across
   */
  async createAllRuleSet(dir: string): Promise<RuleSet> {
    const ret: RuleSet = new RuleSet({
      description: this.description,
      contact: this.contact,
      version: this.version,
      mappings: [],
      owner: this.ruleOwner,
      ruleSetName: this.name
    })
    const rules = globSync(`${dir}/**/*.guard`)
    const resources = await this.getResourceTypes()
    for (const file of rules) {
      const ruleMapping: RuleMapping = {
        controls: ['all rules in AWS Guard Rules Registry'],
        reportsOn: [],
        guardFilePath: file
      }
      const ruleContents = fs.readFileSync(file, 'utf-8')
      for (const resource of resources) {
        if (ruleContents.includes(resource)) {
          ruleMapping.reportsOn.push(resource)
        }
      }
      ret.mappings.push(ruleMapping)
    }
    return ret
  }
}
