import { join } from "path";
import { GuDistributionBucketParameter, GuStackProps } from "@guardian/cdk/lib/constructs/core";
import { GuStack } from "@guardian/cdk/lib/constructs/core";
import { App, validateNumber } from "aws-cdk-lib";
import { CfnInclude } from "aws-cdk-lib/cloudformation-include";
import {GuEc2App} from "@guardian/cdk";
import { AccessScope } from "@guardian/cdk/lib/constants";
import { InstanceType, InstanceClass, InstanceSize } from "aws-cdk-lib/aws-ec2";

export class Backend101ParisaTork extends GuStack {
  constructor(scope: App, id: string, props: GuStackProps) {
    super(scope, id, props);
    const bucket = GuDistributionBucketParameter.getInstance(this).valueAsString;
    const name = "sheep";
    const keyPrefix = `${this.stack}/${this.stage}/${name}`;
    const userData = `#!/bin/bash -ev
    aws s3 cp s3://${bucket}/${keyPrefix}/app.service /etc/systemd/system/${name}.service
    aws s3 cp s3://${bucket}/${keyPrefix}/hello-world.jar /hello-world.jar
    systemctl start ${name}
    `;
    new GuEc2App(this, {
      applicationPort: 9000,
      app: "sheep",
      access: { scope: AccessScope.PUBLIC },
      instanceType: InstanceType.of(InstanceClass.T4G, InstanceSize.MEDIUM),
      certificateProps:{
        domainName: "sheep.code.dev-gutools.com",
      },
      monitoringConfiguration: {
        noMonitoring: true,
      },
      scaling: {
        minimumInstances: 1,
      },
      userData: {
        distributable: {
          fileName: "app-name.deb",
          executionStatement: `dpkg -i /app-name/app-name.deb`,
        }
      },
    });
  }
  

}
