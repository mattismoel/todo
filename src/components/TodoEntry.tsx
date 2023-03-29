import { DragEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faBars } from '@fortawesome/free-solid-svg-icons';

interface Props {
  todo: Todo;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoEntry({ todo, onComplete, onDelete }: Props) {
  let [checked, setChecked] = useState(todo.completed);

  const handleComplete = () => {
    onComplete(todo.id);
    setChecked(!checked);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <div className="p-4 border-2 flex justify-between bg-gradient-to-tl from-slate-100 to-slate-50 rounded-md shadow-sm items-center">
      <p className="font-medium">{todo.text}</p>
      <div className="flex gap-4 items-center">
        <button
          onClick={handleDelete}
          className="text-gray-400 transition hover:text-red-600"
        >
          <FontAwesomeIcon icon={faTrash} className="" />
        </button>
        <input
          type="checkbox"
          name="completed"
          id="completed"
          checked={checked}
          onChange={handleComplete}
          className="text-green-400 rounded-full h-4 w-4 focus:ring-green-600"
        />
      </div>
    </div>
  );
}
