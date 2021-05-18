const os = require('os')
const fs = require('fs')

const CONFIG_FILE_PATH = os.homedir() + '/.orbit.json'
const API_BASE_URL = 'https://app.orbit.love/api/v1'

const credentials = () => {
  const config = fs.readFileSync(CONFIG_FILE_PATH)
  const parsed = JSON.parse(config)
  return parsed
}

module.exports = {
  credentials,
  CONFIG_FILE_PATH,
  API_BASE_URL,
}
