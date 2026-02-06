import { printTable } from '@oclif/table'
import { BaseCommand } from '../../base-command.js'

export default class TransformationsIndex extends BaseCommand<typeof TransformationsIndex> {
  static description = 'List all transformations'

  static examples = [
    '<%= config.bin %> transformations',
  ]

  public async run(): Promise<void> {
    await this.parse(TransformationsIndex)
    const response = await this.fetch('/api/v1/transformations/')
    const transformations = response.results || response

    if (!Array.isArray(transformations)) {
      this.log(JSON.stringify(transformations, null, 2))
      return
    }

    printTable({
      data: transformations,
      columns: [
        { key: 'id', name: 'ID' },
        { key: 'name', name: 'Name' },
        { key: 'status', name: 'Status' },
        { key: 'created_at', name: 'Created At' },
      ],
    })
  }
}