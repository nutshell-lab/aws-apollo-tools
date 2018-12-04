import { setContext } from 'apollo-link-context'
import { LocalStorage } from 'node-localstorage'

const store = new LocalStorage('/tmp/store')

export default link => (headers = {}) =>
  setContext((_request, _context) => {
    const context = store.getItem('context')
    if (!context) return { headers }
    const {
      event: { headers: contextHeaders = {} }
    } = JSON.parse(context)
    return {
      headers: {
        ...headers,
        ...contextHeaders
      }
    }
  }).concat(link)
