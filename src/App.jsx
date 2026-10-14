import { useState } from 'react'
import ProfileCard from './components/ProfileCard'
import './App.css'

const initialTodos = [
  { id: 1, title: 'Learn React', completed: false },
  { id: 2, title: 'Learn JavaScript', completed: true },
  { id: 3, title: 'Plan next project', completed: false },
]

function App() {
  const [todos, setTodos] = useState(initialTodos)
  const [newTodo, setNewTodo] = useState('')
  const [showCompleted, setShowCompleted] = useState(false)

  const visibleTodos = showCompleted ? todos.filter((todo) => todo.completed) : todos
  const completedCount = todos.filter((todo) => todo.completed).length

  function addTodo(event) {
    event.preventDefault()
    const title = newTodo.trim()
    if (!title) return

    setTodos((currentTodos) => [...currentTodos, { id: Date.now(), title, completed: false }])
    setNewTodo('')
  }

  function toggleTodo(id) {
    setTodos((currentTodos) => currentTodos.map((todo) => (
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )))
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <p className="eyebrow">Studio / Personal workspace</p>
        <span className="date-label">Friday, 25 September</span>
      </header>

      <section className="intro">
        <div>
          <p className="eyebrow accent-text">Good morning, team</p>
          <h1>Make room for<br /><em>good work.</em></h1>
        </div>
        <p className="intro-copy">A small, focused space for the things<br />you want to move forward today.</p>
      </section>

      <section className="team-section" aria-labelledby="team-heading">
        <div className="section-heading">
          <h2 id="team-heading">Your crew</h2>
          <span>03 members</span>
        </div>
        <div className="profile-grid">
          <ProfileCard name="Maya Chen" role="Product designer" initials="MC" accent="#f0a44b" />
          <ProfileCard name="Theo Brooks" role="Frontend developer" initials="TB" accent="#b9d8c2" />
          <ProfileCard name="Nia Okafor" role="Project lead" initials="NO" accent="#e5a9bb" />
        </div>
      </section>

      <section className="todo-section" aria-labelledby="todo-heading">
        <div className="section-heading todo-heading">
          <div>
            <p className="eyebrow accent-text">The focus list</p>
            <h2 id="todo-heading">Todo management</h2>
          </div>
          <button className="filter-button" type="button" onClick={() => setShowCompleted((current) => !current)}>
            {showCompleted ? 'Show all' : 'Completed only'}
          </button>
        </div>

        <form className="add-form" onSubmit={addTodo}>
          <label className="sr-only" htmlFor="new-task">New task</label>
          <input id="new-task" value={newTodo} onChange={(event) => setNewTodo(event.target.value)} placeholder="What needs your attention?" />
          <button type="submit">Add todo <span aria-hidden="true">+</span></button>
        </form>

        <div className="todo-list" aria-live="polite">
          {visibleTodos.length === 0 && <p className="empty-state">No tasks available</p>}
          {visibleTodos.map((todo) => (
            <article className={`todo-item ${todo.completed ? 'is-complete' : ''}`} key={todo.id}>
              <button className="check-button" type="button" onClick={() => toggleTodo(todo.id)} aria-label={`${todo.completed ? 'Mark' : 'Complete'} ${todo.title}`}>
                {todo.completed ? '✓' : ''}
              </button>
              <div className="todo-copy">
                <span>{todo.title}</span>
                <small>{todo.completed ? 'Completed' : 'Pending'}</small>
              </div>
              <button className="delete-button" type="button" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </article>
          ))}
        </div>

        <footer className="todo-summary">
          <div><strong>{todos.length}</strong><span>Total tasks</span></div>
          <div><strong>{completedCount}</strong><span>Completed</span></div>
          <div><strong>{todos.length - completedCount}</strong><span>Pending</span></div>
        </footer>
      </section>
    </main>
  )
}

export default App
