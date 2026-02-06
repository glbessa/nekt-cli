# Nekt CLI

The official command-line interface for the Nekt Platform. Manage your data sources, transformations, and execution runs directly from your terminal.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents
<!-- toc -->
* [Installation](#installation)
* [Authentication](#authentication)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

## Installation

```sh
npm install -g nekt-cli
```

## Authentication

Before using the CLI, you need to authenticate with your Nekt API Key:

```sh
nekt auth login
```

The CLI will securely store your API key in your local configuration.

## Usage

```sh
nekt COMMAND [FLAGS]
```

Use `--help` with any command to see detailed usage information.

---

## Commands

<!-- commands -->
* [`nekt auth login`](#nekt-auth-login)
* [`nekt help [COMMAND]`](#nekt-help-command)
* [`nekt runs`](#nekt-runs)
* [`nekt sources`](#nekt-sources)
* [`nekt sources create`](#nekt-sources-create)
* [`nekt transformations`](#nekt-transformations)

### `nekt auth login`

Authenticate the CLI with your Nekt API Key.

```
USAGE
  $ nekt auth login

EXAMPLES
  $ nekt auth login
```

### `nekt sources`

List all configured data sources.

```
USAGE
  $ nekt sources

EXAMPLES
  $ nekt sources
```

### `nekt sources create`

Create a new data source. This command can be used with flags or interactively.

```
USAGE
  $ nekt sources create [-n <value>] [-t <value>]

FLAGS
  -n, --name=<value>  Name of the source
  -t, --type=<value>  Type of the source (e.g., postgres, s3, mongodb)

EXAMPLES
  $ nekt sources create --name "Production DB" --type postgres
  $ nekt sources create
```

### `nekt transformations`

List all available transformations.

```
USAGE
  $ nekt transformations

EXAMPLES
  $ nekt transformations
```

### `nekt runs`

List all execution runs and their current status.

```
USAGE
  $ nekt runs

EXAMPLES
  $ nekt runs
```

### `nekt help [COMMAND]`

Display help for Nekt CLI.

```
USAGE
  $ nekt help [COMMAND]
```
<!-- commandsstop -->

## Development

To run the CLI locally for development:

1. Clone the repository
2. `npm install`
3. `npm run build`
4. `./bin/dev.js [COMMAND]`

## License

MIT © [Nekt AI](https://nekt.ai)