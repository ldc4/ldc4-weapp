const { gql } = require('apollo-server-koa');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type User {
    name: String
    age: Int
  }

  type Query {
    user: [User]
  }
`;

module.exports = typeDefs;