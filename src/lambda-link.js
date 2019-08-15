import { ApolloLink, Observable } from 'apollo-link'
import { print } from 'graphql/language/printer'
import { ApolloError } from 'apollo-server-lambda'
import AWS from 'aws-sdk'

const makeFullHeaders = (headers, { headers: contextHeaders }) => {
  return {
    ...headers,
    ...contextHeaders
  }
}
const parseBody = Payload => {
  const { body } = JSON.parse(Payload)
  const parsedBody = JSON.parse(body)

  if (parsedBody.errors)
    throw new ApolloError(
      parsedBody.errors[0].message,
      parsedBody.errors[0].extensions.code
    )
  return parsedBody
}

export default ({ lambdaName, region, headers, ...options }) => {
  return new ApolloLink(operation => {
    const lambda = new AWS.Lambda({ region })
    const { variables } = operation
    const query = print(operation.query)
    const params = {
      FunctionName: lambdaName,
      Payload: JSON.stringify({
        httpMethod: 'POST',
        body: JSON.stringify({ query, variables }),
        headers: makeFullHeaders(headers, operation.getContext()),
        ...options
      })
    }
    return new Observable(observer => {
      lambda
        .invoke(params)
        .promise()
        .then(({ Payload }) => {
          observer.next(parseBody(Payload))
          observer.complete()
        })
        .catch(error => observer.error(error))
    })
  })
}
