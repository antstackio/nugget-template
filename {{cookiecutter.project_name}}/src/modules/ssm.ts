import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";


class ParameterStore {
  private readonly ssm: SSMClient;
  constructor() {
    this.ssm = new SSMClient();
  }
  async getParameter(name: string): Promise<string> {
    const command = new GetParameterCommand({Name: name, WithDecryption: true});
  const response = await this.ssm.send(command);
  return response.Parameter?.Value || '';
  }
}

export default ParameterStore;