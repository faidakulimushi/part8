import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const logout = () => {
    setToken(null)
    localStorage.clear()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>
          authors
        </button>

        <button onClick={() => setPage('books')}>
          books
        </button>

        {!token ? (
          <button onClick={() => setPage('login')}>
            login
          </button>
        ) : (
          <>
            <button onClick={() => setPage('add')}>
              add book
            </button>

            <button onClick={() => setPage('recommend')}>
              recommend
            </button>

            <button onClick={logout}>
              logout
            </button>
          </>
        )}
      </div>

      {page === 'authors' && (
        <Authors token={token} />
      )}

      {page === 'books' && (
        <Books />
      )}

      {page === 'add' && token && (
        <NewBook />
      )}

      {page === 'recommend' && token && (
        <Recommend />
      )}

      {page === 'login' && !token && (
        <LoginForm setToken={setToken} />
      )}
    </div>
  )
}

export default App