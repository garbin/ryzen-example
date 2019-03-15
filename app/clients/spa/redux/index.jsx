import { init } from '@rematch/core'
import createLoadingPlugin from '@rematch/loading'
import middlewares from './middlewares'
import * as models from './models'
import * as reducers from './reducers'

export default function () {
  return init({
    models,
    plugins: [createLoadingPlugin()],
    redux: {
      middlewares: middlewares(),
      reducers }
  })
}
