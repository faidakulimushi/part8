import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries'

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState(null)

  const allBooksResult = useQuery(ALL_BOOKS)

  const booksResult = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: selectedGenre },
    skip: selectedGenre === null,
  })

  if (allBooksResult.loading) {
    return <div>loading...</div>
  }

  if (allBooksResult.error) {
    return <div>Error: {allBooksResult.error.message}</div>
  }

  const genres = [
    ...new Set(
      allBooksResult.data.allBooks.flatMap(book => book.genres)
    ),
  ]

  const books = selectedGenre
    ? booksResult.data?.allBooks || []
    : allBooksResult.data.allBooks

  return (
    <div>
      <h2>books</h2>

      {selectedGenre && (
        <p>
          in genre <strong>{selectedGenre}</strong>
        </p>
      )}

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>

          {books.map(book => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}

        <button onClick={() => setSelectedGenre(null)}>
          all genres
        </button>
      </div>
    </div>
  )
}

export default Books