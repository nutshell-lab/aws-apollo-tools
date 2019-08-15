import { ApolloServer as ApolloServerClass } from 'apollo-server-lambda'
import { LocalStorage } from 'node-localstorage'

const store = new LocalStorage('/tmp/store')

export class ApolloServer extends ApolloServerClass {
  constructor(args) {
    super(args)
    const { context } = args
    store.setItem('context', JSON.stringify(context))
  }
}
