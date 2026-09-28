import { useState } from 'react'
import './App.css'

interface Todo {
  id: number
  text: string
  completed: boolean
}

type Filter = 'all' | 'active' | 'completed'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  const addTodo = () => {
    if (!input.trim()) return

    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    }

    setTodos((prev) => [...prev, newTodo])
    setInput('')
  }

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed))
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const completedCount = todos.filter((todo) => todo.completed).length
  const progress =
    todos.length === 0
      ? 0
      : Math.round((completedCount / todos.length) * 100)

  return (
    <div className="app">
      <div className="todo-card">
        <div className="header">
          <span className="badge">MY TASK</span>
          <h1>오늘의 할 일</h1>
          <p>해야 할 일을 정리하고 하나씩 완료해보세요.</p>
        </div>

        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addTodo()
            }}
            placeholder="새로운 할 일을 입력하세요"
          />
          <button onClick={addTodo}>추가</button>
        </div>

        <div className="stats">
          <div>
            <span>전체</span>
            <strong>{todos.length}</strong>
          </div>
          <div>
            <span>완료</span>
            <strong>{completedCount}</strong>
          </div>
          <div>
            <span>진행률</span>
            <strong>{progress}%</strong>
          </div>
        </div>

        <div className="progress-bar">
          <div style={{ width: `${progress}%` }} />
        </div>

        <div className="filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            전체
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            진행 중
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            완료
          </button>
        </div>

        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">✓</div>
              <p>
                {filter === 'completed'
                  ? '완료된 할 일이 없습니다.'
                  : filter === 'active'
                    ? '진행 중인 할 일이 없습니다.'
                    : '새로운 할 일을 추가해보세요.'}
              </p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div className="todo-item" key={todo.id}>
                <button
                  className={`check ${todo.completed ? 'checked' : ''}`}
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.completed ? '✓' : ''}
                </button>

                <span className={todo.completed ? 'done' : ''}>
                  {todo.text}
                </span>

                <button
                  className="delete"
                  onClick={() => deleteTodo(todo.id)}
                >
                  삭제
                </button>
              </div>
            ))
          )}
        </div>

        {completedCount > 0 && (
          <button className="clear-button" onClick={clearCompleted}>
            완료된 항목 전체 삭제
          </button>
        )}
      </div>
    </div>
  )
}

export default App