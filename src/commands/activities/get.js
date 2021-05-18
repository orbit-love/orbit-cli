const {Command, flags} = require('@oclif/command')
const chalk = require('chalk')
const {credentials, API_BASE_URL} = require('../../utils/utils')
const {getActivitiesByMember, displayActivity} = require('../../utils/activities')

const {ORBIT_API_KEY, ORBIT_WORKSPACE_ID} = credentials()

class GetNotes extends Command {
  async run() {
    try {
      const {flags} = this.parse(GetNotes)
      if (flags.member) {
        const activities = await getActivitiesByMember({ORBIT_API_KEY, ORBIT_WORKSPACE_ID, API_BASE_URL}, flags.member)
        for (let activity of activities) {
          this.log(displayActivity(activity))
        }
      } else {
        this.log('For the time being the --member flag is required')
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        this.log(chalk.red('A member with this identity does not exist'))
      } else {
        this.error(error.response.status)
      }
    }
  }
}

GetNotes.flags = {
  member: flags.string({char: 'm'}),
}

GetNotes.description = 'List activities.'

module.exports = GetNotes
