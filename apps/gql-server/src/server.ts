const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    type User {
        id: ID!
        username: String
        friends: [User!]!
    }
    
    type Query {
        users: User!
    }
`

const resolvers = {
    Query: {
        users() {
            return {
                id: '1',
                username: 'ms7user',
                friends: [],
            }
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }: { url: string }) => {
    console.log(`server is running on ${url}`)
})
