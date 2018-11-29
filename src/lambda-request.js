import { graphqlRequest } from './core/graphql-request'
import setHeaders from './header-link'
import createLambdaLink from './lambda-link'

export default ({ lambdaName, region, request, variables, headers = {} }) => {
  const link = createLambdaLink({
    lambdaName,
    region,
    headers
  })
  return graphqlRequest({ link: setHeaders(link), request, variables })
}
