// Update with your config settings.
const config = require('../config')

module.exports = {
  migrations: {
    directory: './migrations'
  },
  seeds: {
    directory: './seeds'
  },
  client: config.app.get('database.client', 'postgres'),
  // debug: true,
  connection: config.app.get('database.connection')
}
