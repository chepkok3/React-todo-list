import { useEffect, useState } from 'react';
import './style.css';
import { NewTodoForm } from './NewToDoForm';
import { TodoList } from './TodoList';

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem('todos');
    if (localValue === null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), title, completed: false },
    ]);

    // setNewItem('');
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      {/* <ul className="list">
        {todos.length === 0 && 'No Todos'}
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => toggleTodo(todo.id, e.target.checked)}
              />
              <span>{todo.title}</span>
            </label>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </li>
        ))}
      </ul> */}
    </>
  );
}
