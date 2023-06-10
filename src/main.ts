import * as core from '@actions/core'
import {InputValidator} from './input-validator'
import {S3Client} from '@aws-sdk/client-s3'
import {RuleSet} from './rule-set'
import {CfnGuardAggregator} from './cfn-guard-aggregator'

function castAsBoolean(value: string): boolean {
  return value === 'True' || value === 'true'
}

async function run(): Promise<void> {
  try {
    // Get inputs from the action
    core.debug('Entering Start')
    const makeAggregate: string = core.getInput('MakeAggregateRule')
    let makeAggregateCasted = false

    // Folders
    const mappingsDirectory: string = core.getInput('MappingsDirectory')
    const rulesDirectory: string = core.getInput('RulesDirectory')
    const rulesRegistryBucket: string = core.getInput('RuleRegistryBucket')

    // Aggregate inputs
    const name: string = core.getInput('AggregateName')
    const contact: string = core.getInput('AggregateContact')
    const ruleOwner: string = core.getInput('AggregateOwner')
    const version: string = core.getInput('AggregateVersion')
    const description: string = core.getInput('AggregateDescription')
    const markAsLatest: string = core.getInput('MarkAsLatest')

    core.debug(
      JSON.stringify({
        name,
        contact,
        ruleOwner,
        version,
        description,
        markAsLatest,
        mappingsDirectory,
        rulesDirectory,
        rulesRegistryBucket,
        makeAggregate,
        makeAggregateCasted: castAsBoolean(makeAggregate)
      })
    )

    // Validate Inputs
    const validator = new InputValidator()
    let failed = false
    if (!failed && !validator.isValidBoolean(makeAggregate)) {
      core.setFailed(
        `Action Failed, reason: invalid parameter MakeAggregateRule ${makeAggregate}. MakeAggregateRule parameters must be a valid boolean.`
      )
      failed = true
    } else {
      makeAggregateCasted = makeAggregate === 'true' || makeAggregate === 'True'
      core.debug('MakeAggregate is valid')
    }

    if (!validator.isValidBucketName(rulesRegistryBucket)) {
      core.setFailed(
        `Action Failed, reason: invalid parameter RuleRegistryBucket ${rulesRegistryBucket}. RuleRegistryBucket parameters must be a valid s3 bucket.`
      )
      failed = true
    } else {
      core.debug('RuleRegistryBucket is valid')
    }

    if (!validator.isFolderValid(mappingsDirectory)) {
      core.setFailed(
        `Action Failed, reason: invalid parameter MappingsDirectory ${mappingsDirectory}. MappingsDirectory parameters must be a valid folder.`
      )
      failed = true
    } else {
      core.debug('MappingsDirectory is valid')
    }

    if (makeAggregateCasted) {
      if (!validator.isFolderValid(rulesDirectory)) {
        core.setFailed(
          `Action Failed, reason: invalid parameter RulesDirectory ${rulesDirectory}. RulesDirectory parameters must be a valid folder.`
        )
        failed = true
      } else {
        core.debug('RulesDirectory is valid')
      }

      if (!validator.isValidEmail(ruleOwner)) {
        core.setFailed(
          `Action Failed, reason: invalid parameter RuleOwner ${ruleOwner}. RuleOwner parameters must be valid email address`
        )
        failed = true
      } else {
        core.debug('RuleOwner is valid')
      }

      if (!validator.isValidVersion(version)) {
        core.setFailed(
          `Action Failed, reason: invalid parameter Version ${version}. Version must be in semver format.  For details see https://github.com/npm/node-semver.`
        )
        failed = true
      } else {
        core.debug('Version is valid')
      }

      if (!validator.isValidGenericInput(description)) {
        core.setFailed(
          `Action Failed, reason: invalid parameter Description ${description}. Descriptions can only contain alpha-numeral characters, spaces, and the following special characters: -.!@#$%^&*()`
        )
        failed = true
      } else {
        core.debug('Description is valid')
      }

      if (!validator.isValidBoolean(markAsLatest)) {
        core.setFailed(
          `Action Failed, reason: invalid parameter MarkAsLatest ${markAsLatest}. MarkAsLatest must be a valid boolean.`
        )
        failed = true
      } else {
        core.debug('MarkAsLatest is valid')
      }
    } else {
      core.debug('Do not aggregate')
    }

    // Persist defined rulesets
    const s3Client = new S3Client({})
    if (!failed) {
      core.debug('Starting to push existing rule sets')
      const ruleSets = RuleSet.findRuleSets(mappingsDirectory)
      for (const ruleSet of ruleSets) {
        try {
          await ruleSet.publishToS3(
            rulesRegistryBucket,
            castAsBoolean(markAsLatest),
            s3Client
          )
        } catch (error) {
          core.setFailed(`Action Failed, reason: ${error}`)
          failed = true
        }
      }
      core.debug('Finished pushing existing rule sets')
    }

    if (!failed && makeAggregateCasted) {
      // Aggregate and persist rules into one ruleset
      core.debug('Starting to aggregating rules')
      const agg = new CfnGuardAggregator({
        description,
        version,
        name,
        contact,
        ruleOwner
      })
      core.debug('Finished aggregating rules')

      core.debug('Starting to push aggregate rule')
      const ruleSet = await agg.createAllRuleSet(rulesDirectory)
      try {
        ruleSet.publishToS3(
          rulesRegistryBucket,
          castAsBoolean(markAsLatest),
          s3Client
        )
      } catch (error) {
        core.setFailed(`Action Failed, reason: ${error}`)
      }
      core.debug('Finished pushing aggregate rule')
    }
    // Set outputs of the action
  } catch (error) {
    core.setFailed(`Action Failed, reason: ${error}`)
  }
}

run()
