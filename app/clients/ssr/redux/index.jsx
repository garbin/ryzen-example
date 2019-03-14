import { init } from '@rematch/core'
import createLoadingPlugin from '@rematch/loading'
import middlewares from './middlewares'
import * as reducers from './reducers'
import * as models from './models'

export default function create (initialState) {
  const loading = createLoadingPlugin()
  return init({
    models,
    plugins: [loading],
    redux: {
      reducers,
      initialState,
      middlewares: middlewares() // Carefully! should return a fresh array
    }
  })
}
