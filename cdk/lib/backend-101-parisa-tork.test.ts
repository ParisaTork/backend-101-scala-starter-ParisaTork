import { App } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { Backend101ParisaTork } from "./backend-101-parisa-tork";

describe("The Backend101ParisaTork stack", () => {
  it("matches the snapshot", () => {
    const app = new App();
    const stack = new Backend101ParisaTork(app, "Backend101ParisaTork", { stack: "deploy", stage: "TEST" });
    const template = Template.fromStack(stack);
    expect(template.toJSON()).toMatchSnapshot();
  });
});
