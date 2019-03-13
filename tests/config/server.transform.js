module.exports = require('babel-jest').createTransformer({
  presets: [ ['@babel/preset-env', { targets: { node: 'current' } }] ],
  plugins: [ '@babel/plugin-proposal-export-default-from' ]
})
