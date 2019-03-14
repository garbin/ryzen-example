import serve from 'koa-static'
import mount from 'koa-mount'
import path from 'path'

export default app => app.use(mount('/static', serve(path.resolve(__dirname, '../static'))))
