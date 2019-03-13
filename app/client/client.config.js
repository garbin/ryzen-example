const config = require('../../deploy/config')

module.exports = {
  NODE_ENV: 'development',
  TEST_CONFIG: config.app.get('pubKey')
}
