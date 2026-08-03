import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const { loading, error, data } = useQuery(ALL_BOOKS)
  const [selectedGenre, setSelectedGenre] = useState(null)

  if (!show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const books = data.allBooks

  const genres = [...new Set(books.flatMap(book => book.genres))]

  const filteredBooks = selectedGenre
    ? books.filter(book => book.genres.includes(selectedGenre))
    : books

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

          {filteredBooks.map(book => (
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