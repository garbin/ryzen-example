import { init } from '@rematch/core'
import createLoadingPlugin from '@rematch/loading'
import middlewares from './middlewares'
import * as models from './models'
import * as reducers from './reducers'

export default function (initialState) {
  return init({
    models,
    plugins: [createLoadingPlugin()],
    redux: {
      reducers,
      initialState,
      middlewares: middlewares()
    }
  })
}
