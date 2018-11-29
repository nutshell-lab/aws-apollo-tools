import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'

const cache = new InMemoryCache()

const run = operation => (graphqlClient, request, variables) =>
  operation === 'query'
    ? query(graphqlClient, request, variables)
    : mutate(graphqlClient, request, variables)
const query = (graphqlClient, request, variables) =>
  graphqlClient.query({
    query: request,
    variables,
    fetchPolicy: 'network-only'
  })
const mutate = (graphqlClient, request, variables) =>
  graphqlClient.mutate({
    mutation: request,
    variables,
    fetchPolicy: 'no-cache'
  })

export const graphqlRequest = async ({ link, request, variables = {} }) => {
  const graphqlClient = new ApolloClient({
    link,
    cache
  })
  if (!request.definitions)
    throw new Error(
      `[Apollo Tools] - GraphQL request does not contain any operation`
    )
  const { operation = 'query' } = request.definitions[0] || {}
  const { data } = await run(operation)(graphqlClient, request, variables)
  const key = Object.keys(data)[0]
  return data[key]
}
