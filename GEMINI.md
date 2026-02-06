# Nekt CLI - AI Technical Specification

This document provides a comprehensive overview of the `nekt` CLI tool for AI agents and developers.

## System Architecture

The CLI is built using **oclif v4** (Open CLI Framework) with **TypeScript** and **ESM**.

### Core Components
- **BaseCommand (`src/base-command.ts`)**: An abstract class that extends `oclif.Command`. It provides:
    - Configuration management (loading/saving API keys).
    - A standardized `fetch` wrapper for the Nekt Platform API (`https://api.nekt.ai`).
    - Automatic inclusion of the `x-api-key` header.
- **Authentication**: Uses `inquirer` for secure API key entry. Keys are stored in the user's standard oclif configuration directory (`~/.config/nekt-cli/config.json` on Linux).
- **UI/Formatting**: Uses `@oclif/table` for tabular data rendering.

## Command Structure

All commands inherit from `BaseCommand` and are located in `src/commands/`.

| Command | Description | Endpoint |
| :--- | :--- | :--- |
| `nekt auth login` | Prompts for and saves the API key. | N/A |
| `nekt sources` | Lists all data sources. | `GET /api/v1/sources/` |
| `nekt transformations` | Lists all transformations. | `GET /api/v1/transformations/` |
| `nekt runs` | Lists all execution runs. | `GET /api/v1/runs/` |

## Data Models (Inferred)

The following fields are prioritized in list views:
- **Sources**: `id`, `name`, `type`, `created_at`.
- **Transformations**: `id`, `name`, `status`, `created_at`.
- **Runs**: `id`, `status`, `started_at`, `finished_at`.

## Development Guidelines

### Prerequisites
- Node.js >= 18.0.0
- npm

### Common Tasks
- **Build**: `npm run build` (compiles TS to `dist/`).
- **Development Run**: `./bin/dev.js [command]` (uses `ts-node` to run source directly).
- **Add Command**: Create a new file in `src/commands/` following the existing pattern and inheriting from `BaseCommand`.

### API Integration
When adding new endpoints:
1. Use `this.fetch('/api/v1/your-endpoint')` within the `run()` method.
2. Always call `await this.parse(CommandClass)` at the start of `run()`.
3. Handle both direct array responses and paginated responses (checking for `.results`).

## Troubleshooting
- **Missing API Key**: The `fetch` wrapper in `BaseCommand` will automatically throw an error if no key is found, instructing the user to run `nekt auth login`.
- **TypeScript Errors**: Ensure `npm run build` passes before testing commands.
