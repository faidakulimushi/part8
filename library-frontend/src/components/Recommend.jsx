import { useQuery } from '@apollo/client'
import { ME, BOOKS_BY_GENRE } from '../queries'

const Recommend = () => {
  const meResult = useQuery(ME)

  const booksResult = useQuery(BOOKS_BY_GENRE, {
    skip: !meResult.data,
    variables: {
      genre: meResult.data?.me.favoriteGenre,
    },
  })

  if (meResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  if (meResult.error) {
    return <div>{meResult.error.message}</div>
  }

  if (booksResult.error) {
    return <div>{booksResult.error.message}</div>
  }

  if (!meResult.data) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>

      <p>
        books in your favorite genre{' '}
        <strong>
          {meResult.data.me.favoriteGenre}
        </strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th>
              title
            </th>

            <th>
              author
            </th>

            <th>
              published
            </th>
          </tr>

          {booksResult.data.allBooks.map(book => (
            <tr key={book.title}>
              <td>
                {book.title}
              </td>

              <td>
                {book.author.name}
              </td>

              <td>
                {book.published}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend