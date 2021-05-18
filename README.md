@orbit-love/cli
===============

[![npm version](https://badge.fury.io/js/%40orbit-love%2Fcli.svg)](https://badge.fury.io/js/%40orbit-love%2Fcli)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](.github/CODE_OF_CONDUCT.md)

⚠️ An exceptionally **work-in-progress** command-line interface for interacting with your Orbit workspace. Active development on this particular project is slow as we are building features as we discover the need. Please don't use for anything serious. ⚠️

We welcome contributions! There's lots to do! Check out the [Contributing Guidelines](.github/CONTRIBUTING.md) for more information.

```sh-session
$ npx @orbit-love/cli COMMAND ARGUMENTS FLAGS
```

## Setup

### `setup`

Saves your Orbit Workspace ID and Orbit API Key. You must run this before other commands.

## Members

### `members:get OR members:find`

Shows information from a single member in your workspace. Can also display activities and notes with flags.

```
USAGE
  $ npx @orbit-love/cli members:get source value
  $ npx @orbit-love/cli members:find source value

OPTIONS
  -o, --open  opens member profile in browser
  -a, --activities  lists member's latest activities
  -n, --notes  lists member's latest notes

DESCRIPTION
Source can be any of: github, twitter, email, id
Value is a username, email, or Orbit ID
```

## Notes

### `notes:get`

Lists notes from a single member in your workspace.

```
USAGE
  $ npx @orbit-love/cli notes:get id

DESCRIPTION
id is an Orbit ID - you can get it from the URL path
```

## Activities

### `activities:get`

Lists activities, currently from a single member in your workspace only.

```
USAGE
  $ npx @orbit-love/cli activities:get

OPTIONS
  -m, --member  the member to get activities for

DESCRIPTION
id is an Orbit ID - you can get it from the URL path

EXAMPLE
npx @orbit-love/cli activities:get --member id-goes-here
```

## Supported Endpoints

The following is a list of Orbit API Endpoints and whether the CLI provides support for them:

| API   | Functionality |  Supported?
|:----------|:---------|:-------------|
| Activity Types | - |❌|
| Users | - |❌|
| Activities | <ul><li>Get a member's activities</li></ul> |🟧|
| Members | <ul><li>Get a member by ID</li><li>Find member by identity</li></ul> |🟧|
| Notes | <ul><li>Get a member's notes</li></ul> |🟧|
| Reports | - |❌|
| Reports | - |❌|
| Workspaces | - |❌|

## License

This project is under the [MIT License](./LICENSE).

## Code of Conduct

This project uses the [Contributor Code of Conduct](.github/CODE_OF_CONDUCT.md). We ask everyone to please adhere by its guidelines.
