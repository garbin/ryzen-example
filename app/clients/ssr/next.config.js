const config = require('../../../deploy/config')
const compose = require('just-compose')
const pkg = require('../../../package')
const withCss = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withSourceMaps = require('@zeit/next-source-maps')
const baseURL = config.app.get('servers.ssr.url') || 'http://localhost:8000'
const api = `${baseURL}/api`
module.exports = compose(
  withCss,
  withSass,
  withSourceMaps
)({
  distDir: '../../../build/ssr',
  publicRuntimeConfig: {
    version: pkg.version,
    baseURL,
    api,
    graphql: `${api}/graphql`,
    oauth: {
      token: '/auth/token',
      client_id: '0f434d4b-06bf-4cb2-b8f4-f20bf9349beb',
      client_secret: '530897d5880494a6a9ac92d1273d8ba5',
      url: api,
      providers: {
        github: '/auth/connect/github',
        weibo: '/auth/connect/weibo',
        // twitter: '/auth/connect/twitter',
        weixin: '/auth/connect/weixin'
      }
    }
  },
  webpack: (config, { dev, defaultLoaders }) => {
    defaultLoaders.babel.options.plugins = defaultLoaders.babel.plugins || []
    defaultLoaders.babel.options.plugins.push([
      'react-intl-auto',
      {
        'removePrefix': true
      }
    ])

    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]'
        }
      }
    })
    if (config.resolve.alias) {
      delete config.resolve.alias['react']
      delete config.resolve.alias['react-dom']
    }
    if (!dev) {
      if (config.optimization && config.optimization.minimizer) {
        for (const plugin of config.optimization.minimizer) {
          if (plugin.constructor.name === 'TerserPlugin') {
            plugin.options.sourceMap = true
            break
          }
        }
      }
    }
    return config
  }
})
