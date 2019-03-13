module.exports = require('babel-jest').createTransformer({
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
})
