import { useQuery } from '@apollo/client/react'
import { ALL_AUTHORS } from '../queries'

const Authors = ({ show }) => {
  const { loading, error, data } = useQuery(ALL_AUTHORS)

  if (!show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h2>authors</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>

          {data.allAuthors.map(author => (
            <tr key={author.name}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors