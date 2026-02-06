import { Flags } from '@oclif/core'
import inquirer from 'inquirer'
import { BaseCommand } from '../../base-command.js'

export default class SourcesCreate extends BaseCommand<typeof SourcesCreate> {
  static description = 'Create a new data source'

  static examples = [
    '<%= config.bin %> sources create --name "My DB" --type postgres',
    '<%= config.bin %> sources create',
  ]

  static flags = {
    name: Flags.string({ char: 'n', description: 'Name of the source' }),
    type: Flags.string({ char: 't', description: 'Type of the source' }),
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(SourcesCreate)

    const responses = await inquirer.prompt([
      {
        name: 'name',
        message: 'Enter source name',
        type: 'input',
        when: !flags.name,
      },
      {
        name: 'type',
        message: 'Enter source type',
        type: 'input',
        when: !flags.type,
      },
    ])

    const name = flags.name || responses.name
    const type = flags.type || responses.type

    if (!name || !type) {
      this.error('Both name and type are required to create a source.')
    }

    const response = await this.fetch('/api/v1/sources/', {
      method: 'POST',
      body: JSON.stringify({ name, type }),
    })

    this.log(`Successfully created source: ${response.id || JSON.stringify(response)}`)
  }
}
