import example from './example'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'

// 避免rematch ssr时内部修改，每次返回全新数组
export default args => ([
  thunkMiddleware,
  promiseMiddleware,
  example
])
