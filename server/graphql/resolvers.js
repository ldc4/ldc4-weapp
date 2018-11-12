// Provide resolver functions for your schema fields
const userData = [
  {
    name: 'weedust',
    age: 24,
  },
  {
    name: 'ldc4',
    age: 18
  }
]



const resolvers = {
  Query: {
    user: () => userData,
  },
};

module.exports = resolvers;