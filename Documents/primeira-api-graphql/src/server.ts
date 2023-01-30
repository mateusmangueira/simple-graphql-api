import { ApolloServer, gql } from 'apollo-server';
import { randomUUID } from 'node:crypto';

const typeDefs = gql`
  type User {
    id: String!
    name: String!
    age: Int
  }
  type Query {
    users: [User!]!
  }
  type Mutation {
    createUser(name: String!, age: Int): User!
  }
`

interface User {
  id: string;
  name: string;
  age?: number;
}

const users: User[] = [];

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      users: () => { return users }
    },
    Mutation: {
      createUser: (_, args) => {
        const user = {
          id: randomUUID(),
          name: args.name,
          age: args.age,
        }
        users.push(user);
        return user;
      }
    },
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
})
