import { Todo } from "examples/TodosWithServer";
import React from "react";

export interface Props {
  todo: Todo;
  setCompleted: (todo: Todo, completed: boolean) => void;
  remove: (id: number) => void;
}

export function TodoItem(props: Props) {
  return (
    <li className="p-2 rounded flex items-center hover:bg-gray-100">
      <input
        className="mr-2 my-1"
        type="checkbox"
        onChange={(event) =>
          props.setCompleted(props.todo, event.target.checked)
        }
        checked={props.todo.completed}
      ></input>
      <div className={`${props.todo.completed ? "line-through" : ""}`}>
        <span>{props.todo.title}</span>
      </div>
      <button
        className="mx-2 ml-auto w-4 h-4"
        title="remove"
        onClick={() => props.remove(props.todo.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </li>
  );
}
