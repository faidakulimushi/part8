import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = ({ show }) => {
  const { loading, error, data } = useQuery(ALL_AUTHORS)

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  useEffect(() => {
    if (data?.allAuthors.length > 0 && name === '') {
      setName(data.allAuthors[0].name)
    }
  }, [data, name])

  if (!show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const submit = async (event) => {
    event.preventDefault()

    await editAuthor({
      variables: {
        name,
        setBornTo: Number(born),
      },
    })

    setBorn('')
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

      <h3>Set birthyear</h3>

      <form onSubmit={submit}>
        <div>
          <select
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            {data.allAuthors.map(author => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>

        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors