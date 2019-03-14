const config = require('../../deploy/config')

module.exports = {
  NODE_ENV: 'development',
  API_ROOT_PATH: config.app.get('url') + '/api'
}
