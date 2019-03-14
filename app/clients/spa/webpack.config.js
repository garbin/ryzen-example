const path = require('path')
const config = require('./client.config')
const webpack = require('webpack')
const { NODE_ENV = 'development' } = process.env
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = {
  devtool: NODE_ENV === 'development' ? 'cheap-module-eval-source-map' : 'source-map',
  mode: NODE_ENV,
  entry: { app: ['./app/clients/spa/index'] },
  output: {
    path: path.resolve(__dirname, '../../../build/spa'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env', 'next/babel' ],
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
        }],
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        use: 'file-loader'
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../../../build/spa'),
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: require('html-webpack-template'),
      inject: false,
      title: 'Ryzen Example',
      appMountId: 'app'
    }),
    new webpack.EnvironmentPlugin(config),
    new LodashModuleReplacementPlugin()
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}
