import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoEntry from './components/TodoEntry';
import TodoList from './components/TodoList';

export default function App() {
  let [todos, setTodos] = useState<Todo[]>(
    localStorage.getItem('todos')
      ? JSON.parse(localStorage.getItem('todos')!)
      : []
  );
  let [text, setText] = useState('');

  let [totalCompleted, setTotalCompleted] = useState(
    todos.filter((todo) => todo.completed).length
  );

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    setTotalCompleted(todos.filter((todo) => todo.completed).length);
  }, [todos]);

  const addTodo = () => {
    setTodos([...todos, { id: uuidv4(), text, completed: false }]);
    setText('');
  };

  const handleComplete = (id: string) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      setTodos([...todos]);
    }
  };

  const handleDelete = (id: string) => {
    console.log('Try to delete', id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <main className="p-16 h-screen w-screen flex flex-col items-center pt-72 bg-gradient-to-tl from-slate-200 to-slate-50">
      <div>
        <div className="mb-4 flex gap-4">
          <input
            type="text"
            placeholder="Text"
            className="border-2 rounded-md p-2 font-medium"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <button
            onClick={addTodo}
            className="font-medium bg-gradient-to-tl from-blue-700 to-blue-600 py-2 px-4 text-white rounded-md border-2 border-blue-500 shadow-md  transition-colors hover:from-blue-800 hover:to-blue-700"
          >
            Add
          </button>
        </div>
        <h1 className="font-bold text-2xl mb-4">Todo</h1>
        <TodoList
          emptyMessage="You're free to go! Congratulations. 🎉"
          onTodoComplete={handleComplete}
          onTodoDelete={handleDelete}
          todos={todos.filter((todo) => !todo.completed)}
        />

        <h1 className="font-bold text-2xl mb-4">
          Completed ({totalCompleted}/{todos.length})
        </h1>
        <TodoList
          emptyMessage={
            todos.length === 0
              ? 'Add some todos!'
              : "You're busy - better get going! 💪"
          }
          onTodoComplete={handleComplete}
          onTodoDelete={handleDelete}
          todos={todos.filter((todo) => todo.completed)}
        />
      </div>
    </main>
  );
}
