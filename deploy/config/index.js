const Conf = require('conf')
const path = require('path')
const {
  NODE_ENV = 'development',
  APP_DB_CLIENT = 'pg',
  APP_DATA_DIR = './data',
  APP_SMTP_CONNECTION,
  APP_SMTP_DEFAULTS = '{}',
  APP_DB_CONNECTION = 'postgres://postgres:123456@localhost:5432/ryzen_example',
  APP_PASSPORT_GITHUB,
  APP_PASSPORT_WEIXIN,
  APP_PASSPORT_TWITTER,
  APP_PASSPORT_WEIBO } = process.env
const cwd = path.resolve(__dirname, NODE_ENV)

const passport = {}
if (APP_PASSPORT_GITHUB) passport.github = JSON.parse(APP_PASSPORT_GITHUB)
if (APP_PASSPORT_WEIBO) passport.weibo = JSON.parse(APP_PASSPORT_WEIBO)
if (APP_PASSPORT_WEIXIN) passport.weixin = JSON.parse(APP_PASSPORT_WEIXIN)
if (APP_PASSPORT_TWITTER) passport.twitter = JSON.parse(APP_PASSPORT_TWITTER)

module.exports = {
  app: new Conf({
    defaults: {
      servers: {
        api: {
          port: 6000,
          middlewares: { accesslog: true },
          passport
        },
        ssr: {
          url: '//localhost:7000',
          port: 7000,
          languages: ['zh-CN', 'en-US']
        },
        spa: {
          url: '//localhost:8000',
          port: 8000,
          languages: ['zh-CN', 'en-US']
        }
      },
      data_root: APP_DATA_DIR,
      mailer: { smtp: APP_SMTP_CONNECTION, defaults: JSON.parse(APP_SMTP_DEFAULTS) },
      database: { client: APP_DB_CLIENT, connection: APP_DB_CONNECTION }
    },
    cwd,
    configName: 'app'
  })
}
