module.exports = function (api) {
  if (api.env('test')) return {}
  api.cache(true)
  return {
    presets: [ '@babel/preset-env', 'next/babel' ],
    plugins: [
      '@babel/plugin-proposal-export-default-from',
      [
        'react-intl-auto',
        {
          'removePrefix': true
        }
      ]
    ]
  }
}
