import { printTable } from '@oclif/table'
import { BaseCommand } from '../../base-command.js'

export default class RunsIndex extends BaseCommand<typeof RunsIndex> {
  static description = 'List all runs'

  static examples = [
    '<%= config.bin %> runs',
  ]

  public async run(): Promise<void> {
    await this.parse(RunsIndex)
    const response = await this.fetch('/api/v1/runs/')
    const runs = response.results || response

    if (!Array.isArray(runs)) {
      this.log(JSON.stringify(runs, null, 2))
      return
    }

    printTable({
      data: runs,
      columns: [
        { key: 'id', name: 'ID' },
        { key: 'status', name: 'Status' },
        { key: 'started_at', name: 'Started At' },
        { key: 'finished_at', name: 'Finished At' },
      ],
    })
  }
}