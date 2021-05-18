const pkg = require('../../../package.json')
const {Command, flags} = require('@oclif/command')
const qs = require('querystring')
const axios = require('axios')
const {cli} = require('cli-ux')
const chalk = require('chalk')
const {credentials, API_BASE_URL} = require('../../utils/utils')
const {displayMember} = require('../../utils/members')
const {getActivitiesByMember, displayActivity} = require('../../utils/activities')
const {getNotesByMember, displayNote} = require('../../utils/notes')

const {ORBIT_API_KEY, ORBIT_WORKSPACE_ID} = credentials()

class GetMember extends Command {
  async run() {
    const {args, flags} = this.parse(GetMember)

    if (Object.keys(flags).length > 1) return this.error('You can only provide one flag at a time: --open, --activities, --notes')

    const queryStringOptions = {}
    queryStringOptions.source = args.source
    if (args.source === 'email') queryStringOptions.email = args.value
    else queryStringOptions.username = args.value

    let url = `${API_BASE_URL}/${ORBIT_WORKSPACE_ID}/members`
    if (args.source === 'id') url += `/${args.value}`
    else url += `/find?${qs.encode(queryStringOptions)}`

    axios({
      method: 'GET',
      url,
      headers: {
        Authorization: `Bearer ${ORBIT_API_KEY}`,
        'User-Agent': `orbit-cli/${pkg.version}`,
      },
    }).then(async resp => {
      const notes = await getNotesByMember({ORBIT_API_KEY, ORBIT_WORKSPACE_ID, API_BASE_URL}, resp.data.data.id)
      if (flags.open) {
        await cli.open(resp.data.data.attributes.orbit_url)
        return
      }
      if (flags.notes) {
        for (let note of notes) {
          this.log(displayNote(note))
        }
      }
      if (flags.activities) {
        const activities = await getActivitiesByMember({ORBIT_API_KEY, ORBIT_WORKSPACE_ID, API_BASE_URL}, resp.data.data.id)
        for (let activity of activities) {
          this.log(displayActivity(activity))
        }
      }
      if (Object.keys(flags).length === 0) {
        this.log(displayMember({
          notes,
          member: resp.data.data,
        }))
      }
    }).catch(error => {
      if (error.response && error.response.status === 404) {
        this.log(chalk.red('A member with this identity does not exist'))
      } else {
        this.error(error.response.status)
      }
    })
  }
}

GetMember.aliases = ['members:find']

GetMember.args = [
  {name: 'source', required: true, options: ['github', 'twitter', 'email', 'id']},
  {name: 'value', required: true},
]

GetMember.flags = {
  open: flags.boolean({char: 'o'}),
  notes: flags.boolean({char: 'n'}),
  activities: flags.boolean({char: 'a'}),
}

GetMember.description = 'Get a member.'

module.exports = GetMember
