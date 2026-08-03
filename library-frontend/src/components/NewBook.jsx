import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'

const NewBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [
      { query: ALL_BOOKS },
      { query: ALL_AUTHORS },
    ],
  })

  const submit = async (event) => {
    event.preventDefault()

    await addBook({
      variables: {
        title,
        author,
        published: Number(published),
        genres,
      },
    })

    setTitle('')
    setAuthor('')
    setPublished('')
    setGenres([])
  }

  const addGenre = () => {
    if (genre.trim() !== '') {
      setGenres(genres.concat(genre))
      setGenre('')
    }
  }

  return (
    <div>
      <h2>add book</h2>

      <form onSubmit={submit}>

        <div>
          <label htmlFor="title">
            title
          </label>

          <input
            id="title"
            value={title}
            onChange={({ target }) =>
              setTitle(target.value)
            }
          />
        </div>


        <div>
          <label htmlFor="author">
            author
          </label>

          <input
            id="author"
            value={author}
            onChange={({ target }) =>
              setAuthor(target.value)
            }
          />
        </div>


        <div>
          <label htmlFor="published">
            published
          </label>

          <input
            id="published"
            type="number"
            value={published}
            onChange={({ target }) =>
              setPublished(target.value)
            }
          />
        </div>


        <div>
          <label htmlFor="genre">
            genre
          </label>

          <input
            id="genre"
            value={genre}
            onChange={({ target }) =>
              setGenre(target.value)
            }
          />

          <button
            type="button"
            onClick={addGenre}
          >
            add genre
          </button>
        </div>


        <div>
          genres: {genres.join(' ')}
        </div>


        <button type="submit">
          create book
        </button>

      </form>
    </div>
  )
}

export default NewBook