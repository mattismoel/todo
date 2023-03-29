import { useEffect } from 'react';
import TodoEntry from './TodoEntry';

interface Props {
  todos: Todo[];
  onTodoComplete: (id: string) => void;
  onTodoDelete: (id: string) => void;
  emptyMessage?: string;
}

export default function TodoList({
  todos,
  onTodoComplete,
  onTodoDelete,
  emptyMessage = 'Nothing to show here...',
}: Props) {
  const handleComplete = (id: string) => {
    onTodoComplete(id);
  };

  const handleDelete = (id: string) => {
    onTodoDelete(id);
  };

  useEffect(() => {}, [todos]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-2">
        {todos.map((todo) => (
          <TodoEntry
            key={todo.id}
            todo={todo}
            onComplete={(id) => handleComplete(id)}
            onDelete={(id) => handleDelete(id)}
          />
        ))}

        {todos.length == 0 && (
          <p className="italic text-gray-500">{emptyMessage}</p>
        )}
      </div>
    </div>
  );
}
