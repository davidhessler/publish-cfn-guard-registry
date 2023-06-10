import {RuleSet} from '../src/rule-set'
import {describe, it, expect} from '@jest/globals'
describe('RuleSet', () => {
  it('should instantiate a RuleSet', () => {
    const ruleSet = new RuleSet({
      owner: 'AWS',
      ruleSetName: 'cmmc-level-1',
      version: '1.0.0',
      description:
        'AWS Guard rule set for Center for Cybersecurity Maturity Model Certification (CMMC) Level 1',
      contact: 'aws-guard-rules-registry@amazon.com',
      mappings: [
        {
          guardFilePath:
            '__tests__/rules/aws/aws_dms/dms_replication_not_public.guard',
          controls: ['AC.1.001', 'AC.1.002', 'SC.1.175'],
          reportsOn: ['dms']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/amazon_ec2/ec2_instance_no_public_ip.guard',
          controls: ['AC.1.001', 'AC.1.002', 'AC.1.003'],
          reportsOn: ['ec2']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/amazon_ec2/ec2_instance_profile_attached.guard',
          controls: ['AC.1.001'],
          reportsOn: ['ec2']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/opensearch_service/elasticsearch_in_vpc_only.guard',
          controls: ['AC.1.001', 'AC.1.002', 'SC.1.175'],
          reportsOn: ['opensearch']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/amazon_emr/emr_kerberos_enabled.guard',
          controls: ['AC.1.001', 'AC.1.002', 'IA.1.076', 'IA.1.077'],
          reportsOn: ['emr']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/amazon_emr/emr_master_no_public_ip.guard',
          controls: ['AC.1.001', 'AC.1.002', 'AC.1.003'],
          reportsOn: ['emr']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/iam/iam_no_inline_policy_check.guard',
          controls: ['AC.1.001', 'AC.1.002'],
          reportsOn: ['iam']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/iam/iam_policy_no_statements_with_admin_access.guard',
          controls: ['AC.1.001', 'AC.1.002'],
          reportsOn: ['iam']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/iam/iam_policy_no_statements_with_full_access.guard',
          controls: ['AC.1.001'],
          reportsOn: ['iam']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/iam/iam_user_no_policies_check.guard',
          controls: ['AC.1.001', 'AC.1.002'],
          reportsOn: ['iam']
        },
        {
          guardFilePath: '__tests__/rules/aws/amazon_ec2/restricted_ssh.guard',
          controls: ['AC.1.001', 'AC.1.002', 'AC.1.003', 'SC.1.175'],
          reportsOn: ['ec2']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/amazon_ec2/ec2_instances_in_vpc.guard',
          controls: ['AC.1.001', 'AC.1.002', 'SC.1.175'],
          reportsOn: ['ec2']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/lambda/lambda_function_public_access_prohibited.guard',
          controls: ['AC.1.001', 'AC.1.002', 'AC.1.003', 'SC.1.175'],
          reportsOn: ['lambda']
        },
        {
          guardFilePath: '__tests__/rules/aws/lambda/lambda_inside_vpc.guard',
          controls: ['AC.1.001', 'AC.1.002', 'SC.1.175'],
          reportsOn: ['lambda']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/amazon_rds/rds_instance_public_access_check.guard',
          controls: ['AC.1.001', 'AC.1.002', 'AC.1.003', 'SC.1.175'],
          reportsOn: ['rds']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/amazon_redshift/redshift_cluster_public_access_check.guard',
          controls: ['AC.1.001', 'AC.1.002', 'AC.1.003', 'SC.1.175'],
          reportsOn: ['redshift']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/amazon_ec2/restricted_common_ports.guard',
          controls: ['AC.1.001', 'AC.1.002', 'AC.1.003', 'SC.1.175'],
          reportsOn: ['ec2']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/amazon_s3/s3_bucket_level_public_access_prohibited.guard',
          controls: ['AC.1.001', 'AC.1.002', 'AC.1.003', 'SC.1.175'],
          reportsOn: ['s3']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/amazon_s3/s3_bucket_policy_grantee_check.guard',
          controls: ['AC.1.001', 'AC.1.002'],
          reportsOn: ['s3']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/amazon_s3/s3_bucket_public_read_prohibited.guard',
          controls: ['AC.1.001', 'AC.1.002', 'AC.1.003', 'SC.1.175'],
          reportsOn: ['s3']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/amazon_s3/s3_bucket_public_write_prohibited.guard',
          controls: ['AC.1.001', 'AC.1.002', 'AC.1.003', 'SC.1.175'],
          reportsOn: ['s3']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/amazon_sagemaker/sagemaker_notebook_no_direct_internet_access.guard',
          controls: ['AC.1.001', 'AC.1.002', 'AC.1.003', 'SC.1.175'],
          reportsOn: ['sagemaker']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/secrets_manager/secretsmanager_rotation_enabled_check.guard',
          controls: ['AC.1.001'],
          reportsOn: ['secretsmanager']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/elastic_load_balancing_v2/alb_waf_enabled.guard',
          controls: ['AC.1.003', 'SC.1.175'],
          reportsOn: ['elb']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/amazon_ec2_auto_scaling/autoscaling_launch_config_public_ip_disabled.guard',
          controls: ['AC.1.003'],
          reportsOn: ['autoscaling']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/amazon_ec2/no_unrestricted_route_to_igw.guard',
          controls: ['AC.1.003', 'SC.1.175'],
          reportsOn: ['ec2']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/amazon_ec2/subnet_auto_assign_public_ip_disabled.guard',
          controls: ['AC.1.003'],
          reportsOn: ['ec2']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/api_gateway/api_gw_execution_logging_enabled.guard',
          controls: ['IA.1.076'],
          reportsOn: ['apigateway']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/cloudtrail/cloudtrail_s3_dataevents_enabled.guard',
          controls: ['IA.1.076'],
          reportsOn: ['cloudtrail']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/cloudtrail/cloud_trail_cloud_watch_logs_enabled.guard',
          controls: ['IA.1.076'],
          reportsOn: ['cloudtrail']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/elastic_load_balancing/elb_logging_enabled.guard',
          controls: ['IA.1.076'],
          reportsOn: ['elb']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/amazon_rds/rds_logging_enabled.guard',
          controls: ['IA.1.076'],
          reportsOn: ['rds']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/amazon_s3/s3_bucket_logging_enabled.guard',
          controls: ['IA.1.076'],
          reportsOn: ['s3']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/aws_waf_v2/wafv2_logging_enabled.guard',
          controls: ['IA.1.076'],
          reportsOn: ['waf']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/elastic_load_balancing_v2/alb_http_drop_invalid_header_enabled.guard',
          controls: ['SC.1.175'],
          reportsOn: ['elb']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/elastic_load_balancing_v2/alb_http_to_https_redirection_check.guard',
          controls: ['SC.1.175'],
          reportsOn: ['elb']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/cloudwatch/cloudwatch_alarm_action_check.guard',
          controls: ['SC.1.175', 'SI.1.210'],
          reportsOn: ['cloudwatch']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/opensearch_service/elasticsearch_node_to_node_encryption_check.guard',
          controls: ['SC.1.175'],
          reportsOn: ['opensearch']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/elastic_load_balancing/elb_acm_certificate_required.guard',
          controls: ['SC.1.175'],
          reportsOn: ['elb']
        },
        {
          guardFilePath:
            '__tests__/rules/aws/elastic_load_balancing/elb_tls_https_listeners_only.guard',
          controls: ['SC.1.175'],
          reportsOn: ['elb']
        },

        {
          guardFilePath:
            '__tests__/rules/aws/amazon_s3/s3_bucket_ssl_requests_only.guard',
          controls: ['SC.1.175'],
          reportsOn: ['s3']
        }
      ]
    })

    const ex = expect(ruleSet)
    ex.toHaveProperty('owner', 'AWS')
    ex.toHaveProperty('ruleSetName', 'cmmc-level-1')
    ex.toHaveProperty('version', '1.0.0')
    ex.toHaveProperty(
      'description',
      'AWS Guard rule set for Center for Cybersecurity Maturity Model Certification (CMMC) Level 1'
    )
    ex.toHaveProperty('contact', 'aws-guard-rules-registry@amazon.com')
  })

  it('should aggregate into a valid rule set', () => {
    const ruleSet = new RuleSet({
      owner: 'AWS',
      ruleSetName: 'cmmc-level-1',
      version: '1.0.0',
      description:
        'AWS Guard rule set for Center for Cybersecurity Maturity Model Certification (CMMC) Level 1',
      contact: 'aws-guard-rules-registry@amazon.com',
      mappings: [
        {
          guardFilePath:
            '__tests__/rules/aws/aws_dms/dms_replication_not_public.guard',
          controls: ['AC.1.001', 'AC.1.002', 'SC.1.175'],
          reportsOn: ['dms']
        }
      ]
    })
    expect(ruleSet).not.toBeNull()
    const ret = ruleSet.aggregateRuleContent()
    expect(ret).not.toBeNull()
    expect(ret).toEqual(
      '#\n' +
        '#####################################\n' +
        '##           Gherkin               ##\n' +
        '#####################################\n' +
        '# Rule Identifier:\n' +
        '#    DMS_REPLICATION_NOT_PUBLIC\n' +
        '#\n' +
        '# Description:\n' +
        '#   Checks whether AWS Database Migration Service replication instances are not set to allow public.\n' +
        '#\n' +
        '# Reports on:\n' +
        '#    AWS::DMS::ReplicationInstance\n' +
        '#\n' +
        '# Evaluates:\n' +
        '#    AWS CloudFormation\n' +
        '#\n' +
        '# Rule Parameters:\n' +
        '#    NA\n' +
        '#\n' +
        '# Scenarios:\n' +
        '# a) SKIP: when there is no DMS Replication Instance present\n' +
        '# b) FAIL: When DMS Replication Instance is present and PubliclyAccessible property is set to true\n' +
        '# c) PASS: When DMS Replication Instance is present and PubliclyAccessible property is set to false\n' +
        '# c) PASS: When DMS Replication Instance is present and PubliclyAccessible property is not set\n' +
        '# d) SKIP: when metada has rule suppression for DMS_REPLICATION_NOT_PUBLIC\n' +
        '\n' +
        '#\n' +
        '# Select all Redshift cluster resources from incoming template\n' +
        '#\n' +
        '\n' +
        "let dms_replication_instances = Resources.*[ Type == 'AWS::DMS::ReplicationInstance'\n" +
        '  Metadata.guard.SuppressedRules not exists or\n' +
        '  Metadata.guard.SuppressedRules.* != "DMS_REPLICATION_NOT_PUBLIC"\n' +
        ']\n' +
        '\n' +
        'rule DMS_REPLICATION_NOT_PUBLIC when %dms_replication_instances !empty {\n' +
        '  %dms_replication_instances.Properties.PubliclyAccessible exists\n' +
        '  %dms_replication_instances.Properties.PubliclyAccessible == false\n' +
        '  <<\n' +
        '    Guard Rule Set: cmmc-level-1\n' +
        '    Controls: AC.1.001, AC.1.002, SC.1.175\n' +
        '    Violation: AWS Database Migration Service replication instances should not be public.\n' +
        '    Fix: Set the DMS Replication Instance property PubliclyAccessible parameter to true.\n' +
        '  >>\n' +
        '}' +
        '\n'
    )
  })
})
