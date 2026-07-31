require('dotenv').config()

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const User = require('./models/user')

mongoose.set('strictQuery', false)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },

  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      try {
        const decodedToken = jwt.verify(
          auth.substring(7),
          process.env.JWT_SECRET
        )

        const currentUser = await User.findById(decodedToken.id)

        return { currentUser }
      } catch (error) {
        return {}
      }
    }

    return {}
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})