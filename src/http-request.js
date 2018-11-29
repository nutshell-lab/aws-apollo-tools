import { createHttpLink } from 'apollo-link-http'
import fetch from 'node-fetch'
import hmacfetch from './aws4-signer'
import { graphqlRequest } from './core/graphql-request'

export default ({
  uri,
  region,
  request,
  signed = true,
  variables,
  headers = {}
}) => {
  const link = createHttpLink({
    uri,
    headers: {
      ...headers,
      region
    },
    fetch: signed ? hmacfetch : fetch
  })
  return graphqlRequest({ link, request, variables })
}
