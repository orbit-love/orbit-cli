const pkg = require('../../package.json')
const boxen = require('boxen')
const axios = require('axios')
const moment = require('moment')

const getNotesByMember = (opts, memberId) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `${opts.API_BASE_URL}/${opts.ORBIT_WORKSPACE_ID}/members/${memberId}/notes`,
      headers: {
        Authorization: `Bearer ${opts.ORBIT_API_KEY}`,
        'User-Agent': `orbit-cli/${pkg.version}`,
      },
    }).then(resp => {
      resolve(resp.data.data)
    }).catch(error => {
      reject(error)
    })
  })
}

const displayNote = note => {
  const lines = []
  lines.push(note.attributes.body)
  lines.push('\n')
  lines.push(moment(note.attributes.created_at).format('Do MMM YYYY'))
  return boxen(lines.join('\n'), {padding: 1, borderColor: '#6C4DF6', borderStyle: 'classic'})
}

module.exports = {
  getNotesByMember,
  displayNote,
}
