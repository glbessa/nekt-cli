import inquirer from 'inquirer'
import { BaseCommand } from '../../base-command.js'

export default class AuthLogin extends BaseCommand<typeof AuthLogin> {
  static description = 'Authenticate with Nekt API Key'

  static examples = [
    '<%= config.bin %> auth login',
  ]

  public async run(): Promise<void> {
    await this.parse(AuthLogin)
    const responses = await inquirer.prompt([
      {
        name: 'apiKey',
        message: 'Enter your Nekt API Key',
        type: 'password',
        mask: '*',
      }
    ])

    await this.saveConfig({ apiKey: responses.apiKey })
    this.log('Successfully authenticated!')
  }
}