import { Command } from '@oclif/core'
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { join } from 'node:path'

export type Config = {
  apiKey?: string;
}

export abstract class BaseCommand<T extends typeof Command> extends Command {
  protected async getConfig(): Promise<Config> {
    const configPath = join(this.config.configDir, 'config.json')
    try {
      const data = await readFile(configPath, 'utf8')
      return JSON.parse(data)
    } catch {
      return {}
    }
  }

  protected async saveConfig(data: Config): Promise<void> {
    const configPath = join(this.config.configDir, 'config.json')
    await mkdir(this.config.configDir, { recursive: true })
    await writeFile(configPath, JSON.stringify(data, null, 2))
  }

  protected async fetch(path: string, options: RequestInit = {}) {
    const { apiKey } = await this.getConfig()
    if (!apiKey) {
      this.error('No API key found. Please run "nekt auth login" first.')
    }

    const response = await fetch(`https://api.nekt.ai${path}`, {
      ...options,
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      this.error(`API Error: ${response.statusText} ${JSON.stringify(errorData)}`)
    }

    return response.json()
  }
}
