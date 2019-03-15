import { isFunction } from 'lodash'
import { Loading } from './loading'

export function apolloResult (props) {
  props = isFunction(props) ? { success: props } : props
  const {
    error = e => (<div>Error: {e.message}</div>),
    success = d => <div>{JSON.stringify(d)}</div>,
    loading = d => <Loading />
  } = props
  return (result) => {
    const { data, loading: l, error: e } = result
    if (l) return loading(result)
    if (e) return error(e, result)
    if (data) return success(data, result)
  }
}
