import config from '../../../deploy/config'
const { describe, test, expect } = global
describe('config', () => {
  test('initialize', () => {
    expect(config.app.has('servers.ssr.port')).toBe(true)
  })
})
