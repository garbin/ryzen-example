import { init } from '@rematch/core'
import * as models from './models'
import reducers from './reducers'

export default function () {
  return init({ models, redux: { reducers } })
}
