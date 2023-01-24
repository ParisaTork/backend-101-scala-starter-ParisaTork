import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { Backend101ParisaTork } from "../lib/backend-101-parisa-tork";

const app = new App();
new Backend101ParisaTork(app, "Backend101ParisaTork-CODE", { stack: "flexible", stage: "CODE" });
new Backend101ParisaTork(app, "Backend101ParisaTork-PROD", { stack: "flexible", stage: "PROD" });
