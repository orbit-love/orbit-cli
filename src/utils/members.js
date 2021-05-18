const moment = require('moment')
const boxen = require('boxen')
const axios = require('axios')

const memberProfileBox = options => {
  const a  = options.member.attributes

  const lines = []

  let headline = a.name
  if (a.pronouns) headline += ` (${a.pronouns}) `
  lines.push(headline)

  if (a.company) lines.push(`Works at ${a.company}`)
  if (a.location) lines.push(`Based in ${a.location}`)

  if (a.bio) lines.push(`\n${a.bio}\n`)

  let identities = []
  if (a.github) identities.push(`🐙 ${a.github} ${a.github_followers}`)
  if (a.twitter) identities.push(`🐦 ${a.twitter} ${a.twitter_followers}`)
  if (a.email) identities.push(a.email)
  if (identities.length > 0) lines.push(identities.join(' / '))

  lines.push('')

  let orbitMetrics = `Love ${a.love}`
  if (a.reach) orbitMetrics = `Reach ${a.reach} / ` + orbitMetrics
  if (a.orbit_level) orbitMetrics = `Orbit Level ${a.orbit_level} / ` + orbitMetrics
  lines.push(orbitMetrics)

  let activities = `${a.activities_count} activities`
  if (a.activities_count > 0) activities += ` between ${moment(a.first_activity_occurred_at).fromNow()} and ${moment(a.last_activity_occurred_at).fromNow()}`
  lines.push(activities)

  lines.push(`${options.notes.length} notes`)

  lines.push('')

  if (a.tags.length > 0) lines.push(`Tags: ${a.tags.join(', ')}`)

  lines.push('')

  if (a.activities_count > 0) lines.push('Use --activities to see latest activities.')
  if (options.notes.length > 0) lines.push('Use --notes to see latest notes.')
  lines.push('Use --open to see member profile in the browser.')

  return (boxen(lines.join('\n'), {padding: 1, borderColor: '#6C4DF6', borderStyle: 'classic'}))
}

const noteBox = note => {
  const lines = []
  lines.push(note.attributes.body)
  lines.push('\n')
  lines.push(moment(note.attributes.created_at).format('Do MMM YYYY'))
  return boxen(lines.join('\n'), {padding: 1, borderColor: '#6C4DF6', borderStyle: 'classic'})
}

const getMemberNotes = (opts, memberId) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `${opts.API_BASE_URL}/${opts.ORBIT_WORKSPACE_ID}/members/${memberId}/notes`,
      headers: {Authorization: `Bearer ${opts.ORBIT_API_KEY}`},
    }).then(resp => {
      resolve(resp.data.data)
    }).catch(error => {
      reject(error)
    })
  })
}

const getMemberActivities = (opts, memberId) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `${opts.API_BASE_URL}/${opts.ORBIT_WORKSPACE_ID}/members/${memberId}/activities`,
      headers: {Authorization: `Bearer ${opts.ORBIT_API_KEY}`},
    }).then(resp => {
      resolve(resp.data.data.filter(a => a.attributes.type !== 'NoteActivity'))
    }).catch(error => {
      reject(error)
    })
  })
}

const activityBox = activity => {
  // eslint-disable-next-line
  const {tags, occurred_at} = activity.attributes

  const lines = []
  for (let tag of tags) {
    lines.push('Tag: ' + tag)
  }
  lines.push(moment(occurred_at).format('Do MMM YYYY') + ' / ID: ' + activity.id)
  return boxen(lines.join('\n'), {padding: {left: 1, right: 1}, borderColor: '#6C4DF6', borderStyle: 'classic'})
}

module.exports = {
  memberProfileBox,
  noteBox,
  getMemberNotes,
  getMemberActivities,
  activityBox,
}
