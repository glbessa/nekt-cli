import { printTable } from '@oclif/table'
import { BaseCommand } from '../../base-command.js'

export default class SourcesIndex extends BaseCommand<typeof SourcesIndex> {
  static description = 'List all sources'

  static examples = [
    '<%= config.bin %> sources',
  ]

  public async run(): Promise<void> {
    await this.parse(SourcesIndex)
    const response = await this.fetch('/api/v1/sources/')
    const sources = response.results || response

    if (!Array.isArray(sources)) {
      this.log(JSON.stringify(sources, null, 2))
      return
    }

    printTable({
      data: sources,
      columns: [
        { key: 'id', name: 'ID' },
        { key: 'name', name: 'Name' },
        { key: 'type', name: 'Type' },
        { key: 'created_at', name: 'Created At' },
      ],
    })
  }
}