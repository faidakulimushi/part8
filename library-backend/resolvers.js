const Book = require('./models/book')
const Author = require('./models/author')

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),

    authorCount: async () => await Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      const filter = {}

      if (args.genre) {
        filter.genres = { $in: [args.genre] }
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author })

        if (!author) {
          return []
        }

        filter.author = author._id
      }

      return await Book.find(filter).populate('author')
    },

    allAuthors: async () => {
      return await Author.find({})
    },
  },

  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({
          name: args.author,
        })

        await author.save()
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author._id,
      })

      await book.save()

      return await book.populate('author')
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }

      author.born = args.setBornTo
      await author.save()

      return author
    },
  },

  Author: {
    bookCount: async (root) => {
      return await Book.countDocuments({ author: root._id })
    },
  },
}

module.exports = resolvers