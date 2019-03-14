import path from 'path'
import serve from 'koa-static'
import koaWebpack from 'koa-webpack'
import webpackConfig from '../../../clients/spa/webpack.config'

export default async app => {
  const dev = process.env.NODE_ENV !== 'production'
  if (dev) {
    const middleware = await koaWebpack({ config: webpackConfig })
    app.use(middleware)
  } else {
    app.use(serve(path.resolve(__dirname, '../../../../build')))
  }
}
