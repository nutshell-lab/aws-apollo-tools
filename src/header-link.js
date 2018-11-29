import { setContext } from 'apollo-link-context'

export default headers =>
  setContext((_request, context) => {
    console.log('context', context)
    if (!context.graphqlContext) return {}
    if (!context.graphqlContext.headers) return {}
    return {
      headers: {
        ...context.graphqlContext.headers,
        ...headers
      }
    }
  })
