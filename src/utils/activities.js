const pkg = require('../../package.json')
const boxen = require('boxen')
const axios = require('axios')
const moment = require('moment')

const getActivitiesByMember = (opts, memberId) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `${opts.API_BASE_URL}/${opts.ORBIT_WORKSPACE_ID}/members/${memberId}/activities`,
      headers: {
        Authorization: `Bearer ${opts.ORBIT_API_KEY}`,
        'User-Agent': `orbit-cli/${pkg.version}`,
      },
    }).then(resp => {
      resolve(resp.data.data.filter(a => a.attributes.type !== 'NoteActivity'))
    }).catch(error => {
      reject(error)
    })
  })
}

const displayActivity = activity => {
  const {tags, occurred_at: occurredAt} = activity.attributes

  const lines = []
  for (let tag of tags) {
    lines.push('Tag: ' + tag)
  }
  lines.push(moment(occurredAt).format('Do MMM YYYY') + ' / ID: ' + activity.id)
  return boxen(lines.join('\n'), {padding: {left: 1, right: 1}, borderColor: '#6C4DF6', borderStyle: 'classic'})
}

module.exports = {
  getActivitiesByMember,
  displayActivity,
}
