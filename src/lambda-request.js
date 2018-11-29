import { ApolloLink } from 'apollo-link'
import { graphqlRequest } from './core/graphql-request'
import createHeaderLink from './header-link'
import createLambdaLink from './lambda-link'

export default ({ lambdaName, region, request, variables, headers = {} }) => {
  const link = ApolloLink.from([
    createHeaderLink(),
    createLambdaLink({
      lambdaName,
      region
    })
  ])
  return graphqlRequest({ name: lambdaName, link, request, variables })
}
