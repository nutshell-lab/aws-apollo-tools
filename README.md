# aws-apollo-tools [![Node version](https://img.shields.io/badge/nodejs-8.10.0-blue.svg)](https://nodejs.org/en/blog/release/v8.10.0/)

> Just make GraphQL requests through AWS LambdaInvoke or HTTP


## Install

```
$ yarn add @nutshelllab/aws-apollo-tools
```

## Usage

### Prerequisites

in `serverless.yml`
```yml
...
provider:
  ...
  environment:
    SLS_STAGE: ${self:provider.stage} 
  iamRoleStatements:
    - Effect: Allow
      Action: # Set permissions for specific Lambdas
        - execute-api:*
      Resource: '*'
...
```

### LambdaRequest

```js
import gql from 'graphql-tag'
import graphqlLambdaRequest from '@nutshelllab/aws-apollo-tools/lambda-request'

const request = gql`
  query getItem($id: ID!) {
    getItem(id: $id) {
      id
    }
  }
`

const variables = {
  id: '110e8400-e29b-11d4-a716-446655440000'
}

const test = await graphqlLambdaRequest({
  lambdaName: 'my-lambda-name',
  region: 'eu-west-1',
  request,
  variables
})

```

#### Options

|name|required|type|info|
|---|---|---|---|
|lambdaName|true|string|The lambda endpoint must provide an apollo server|
|region|true|string|   |
|request|true|string|It must be a GraphQL query [graphql-tag](https://github.com/apollographql/graphql-tag#readme)|
|variables|false|object|   |
|headers|false|object|   |

### HttpRequest

```js
import gql from 'graphql-tag'
import graphqlHttpRequest from '@nutshelllab/aws-apollo-tools/http-request'

const request = gql`
  query getItem($id: ID!) {
    getItem(id: $id) {
      id
    }
  }
`

const variables = {
  id: '110e8400-e29b-11d4-a716-446655440000'
}

const test = await graphqlHttpRequest({
  uri: 'https://my-apollo-server-endpoint.com',
  region: 'eu-west-1',
  request,
  variables,
  signed: true
})

```

#### Options

|name|required|type|info|
|---|---|---|---|
|uri|true|string|The http endpoint must provide an apollo server|
|region|true|string|   |
|request|true|string|It must be a GraphQL query [graphql-tag](https://github.com/apollographql/graphql-tag#readme)|
|signed|false|bool|Setting to `true` enable aws signature v4, be sure that your http endpoint as `authorizer: aws_iam`|
|variables|false|object|   |
|headers|false|object|   |


## License

MIT © [Nutshell](https://nutshell-lab.com)
