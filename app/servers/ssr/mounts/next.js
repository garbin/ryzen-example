import next from 'next'
import path from 'path'
import fs from 'fs'
import IntlPolyfill from 'intl'
import config from '../../../../deploy/config'
Intl.NumberFormat = IntlPolyfill.NumberFormat
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat

const localeDataCache = new Map()

const getLocaleDataScript = (locale) => {
  const lang = locale.split('-')[0]
  if (!localeDataCache.has(lang)) {
    const localeDataFile = require.resolve(`react-intl/locale-data/${lang}`)
    const localeDataScript = fs.readFileSync(localeDataFile, 'utf8')
    localeDataCache.set(lang, localeDataScript)
  }
  return localeDataCache.get(lang)
}

const getMessages = locale => require(`../../../clients/ssr/locales/${locale.replace('-', '_')}.json`)

export default async app => {
  const dev = process.env.NODE_ENV !== 'production'
  const nextApp = next({
    dev,
    dir: path.resolve(__dirname, '../../../clients/ssr')
  })
  const routes = require('../../../clients/ssr/routes')
  const handle = routes.getRequestHandler(nextApp)
  await nextApp.prepare()
  app.use(async (ctx, next) => {
    const languages = config.app.get('servers.ssr.languages', ['zh-CN'])
    await next()
    const locale = ctx.acceptsLanguages(languages) || languages[0]
    ctx.req.locale = locale
    ctx.req.localeDataScript = getLocaleDataScript(locale)
    ctx.req.messages = dev ? {} : getMessages(locale)
    ctx.req.cookies = ctx.cookies
    ctx.req.origin = ctx.request.origin
    ctx.res.statusCode = 200
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })
}
