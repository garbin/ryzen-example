const { start, stop } = require('../../app/servers/api')
const { knex } = require('../../app/models')
require('../config/mocks/github')
const { afterAll } = global

const server = start()

afterAll(async () => {
  stop()
  knex.destroy()
})

export { server, knex }
