import { graphqlRequest } from './core/graphql-request'
import createLambdaLink from './lambda-link'
import withHeaders from './link-with-headers'

export default ({ lambdaName, region, request, variables, headers = {} }) => {
  const link = withHeaders(
    createLambdaLink({
      lambdaName,
      region
    })
  )(headers)

  return graphqlRequest({ link, request, variables })
}
