import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface Todo {
  value: string;
  id: number;
  checked: boolean;
  removed: boolean;
}

type Filter = 'all' | 'checked' | 'unchecked' | 'removed'


const App: React.VFC = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };

    setTodos([newTodo, ...todos])
    setText('')
  }

  const handleOnEdit = (id: number, value: string) => {
    console.log(id);
    console.log(value);

    const newTodos: Todo[] = todos.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }

      return todo;
    })

    setTodos(newTodos);
  }

  const handleOnChecked = (id: number, checked: boolean) => {
    const newTodos: Todo[] = todos.map((todo: Todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    })

    setTodos(newTodos);
  }

  const handleOnRemove = (id: number, removed: boolean) => {
    const newTodos: Todo[] = todos.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed;
      }

      return todo;
    })

    setTodos(newTodos);
  }

  const handleOnEmpty = () => {
    const newTodos: Todo[] = todos.filter((todo) => !todo.removed)
    setTodos(newTodos);
  }

  const filterdTodos = todos.filter((todo) => {
    switch (filter) {
      case 'all':
        return !todo.removed;
      case 'checked':
        return !todo.removed && todo.checked;
      case 'unchecked':
        return !todo.removed && !todo.checked;
      case 'removed':
        return todo.removed;
      default:
        return todo;
    }
  })

  return (
    <div>
      <select
        defaultValue="all"
        onChange={(e) => setFilter(e.target.value as Filter)}
      >
        <option value="all">?????????????????????</option>
        <option value="checked">?????????????????????</option>
        <option value="unchecked">?????????????????????</option>
        <option value="removed">?????????????????????</option>
      </select>
      {filter === 'removed' ? (
        <button
          onClick={() => handleOnEmpty()}
          disabled={todos.filter((todo) => todo.removed).length === 0}
        >
          ????????????????????????
        </button>
      ) : (
        <form onSubmit={(e) => handleOnSubmit(e)}>
          <input
            type="text"
            value={text}
            disabled={filter === 'checked'}
            onChange={(e) => setText(e.target.value)} />
          <input
            type="submit"
            value='??????'
            disabled={filter === 'checked'}
            onSubmit={(e) => e.preventDefault()} />
        </form>
      )}

      <ul>
        {filterdTodos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                disabled={todo.removed}
                checked={todo.checked}
                onChange={() => handleOnChecked(todo.id, todo.checked)} />
              <input
                type="text"
                disabled={todo.checked || todo.removed}
                value={todo.value}
                onChange={(e) => handleOnEdit(todo.id, e.target.value)} />
              <button onClick={() => handleOnRemove(todo.id, todo.removed)}>
                {todo.removed ? '??????' : '??????'}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));