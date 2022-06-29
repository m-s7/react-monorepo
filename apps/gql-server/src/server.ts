const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    type Car {
        id: ID!
        brand: String!
        model: String!
        similar: [Car!]!
    }
    
    type Query {
        cars: [Car]!
    }
`

const resolvers = {
    Query: {
        cars() {
            return [{
                id: '1',
                brand: 'audi',
                model: 'rs7 c8',
                similar: [],
            }]
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
