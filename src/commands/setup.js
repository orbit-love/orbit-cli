const fs = require('fs')
const {Command} = require('@oclif/command')
const {cli} = require('cli-ux')
const {CONFIG_FILE_PATH} = require('../utils/utils')

class Setup extends Command {
  async run() {
    const ORBIT_WORKSPACE_ID = await cli.prompt('What is your Orbit Workspace ID?')
    const ORBIT_API_KEY = await cli.prompt('What is your Orbit API Key?')
    const data = JSON.stringify({ORBIT_API_KEY, ORBIT_WORKSPACE_ID})

    fs.writeFile(CONFIG_FILE_PATH, data, 'utf8', err => {
      if (err) this.error(err)
      else this.log('Config saved in ' + CONFIG_FILE_PATH)
    })
  }
}

Setup.description = 'Setup the CLI with your Orbit credentials'

module.exports = Setup
