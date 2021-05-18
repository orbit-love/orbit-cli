const {Command} = require('@oclif/command')
const chalk = require('chalk')
const {credentials, API_BASE_URL} = require('../../utils/utils')
const {getNotesByMember, displayNote} = require('../../utils/notes')

const {ORBIT_API_KEY, ORBIT_WORKSPACE_ID} = credentials()

class GetNotes extends Command {
  async run() {
    try {
      const {args} = this.parse(GetNotes)
      const notes = await getNotesByMember({ORBIT_API_KEY, ORBIT_WORKSPACE_ID, API_BASE_URL}, args.user)
      for (let note of notes) {
        this.log(displayNote(note))
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

GetNotes.args = [
  {name: 'user', required: true},
]

GetNotes.description = 'Get a member\'s notes.'

module.exports = GetNotes
