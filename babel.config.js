module.exports = function (api) {
  if (api.env('test')) return {}
  api.cache(true)
  return {
    presets: [ '@babel/preset-env', '@babel/preset-react' ],
    plugins: [
      '@babel/plugin-proposal-export-default-from',
      'react-hot-loader/babel',
      [
        'react-intl-auto',
        {
          'removePrefix': true
        }
      ]
    ]
  }
}
