import React, { useState } from "react";
import { TodoItem } from "./TodoItem";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
type NewTodo = Omit<Todo, "id" | "completed">;

interface Props {
  name?: string;
  initialTodos?: Todo[];
}

export function TodoList({ initialTodos = [], name = "" }: Props) {
  const [todoInput, setTodoInput] = useState("");
  const { todos, add, remove, setCompleted } = useTodos(initialTodos);
  const [showCompleted, setShowCompleted] = useState(true);

  function addTodo() {
    add({ title: todoInput });
    setTodoInput("");
  }

  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="container mx-auto p-8 max-w-md">
      <h2 className="text-xl mb-4">{name}</h2>
      <div className="flex">
        <input
          className="px-2 py-1 bg-gray-100 placeholder-gray-700 rounded flex-grow mr-2"
          placeholder="Add something"
          value={todoInput}
          onChange={(event) => setTodoInput(event.target.value)}
        ></input>
        <button
          className="ml-auto px-2 py-1 bg-gray-100 hover:bg-gray-300 rounded"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      <ul className="mt-2">
        {todos
          .filter((todo) => !todo.completed)
          .map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              remove={remove}
              setCompleted={setCompleted}
            ></TodoItem>
          ))}
      </ul>
      <button
        className="text-sm mt-2 flex items-center"
        onClick={() => setShowCompleted((current) => !current)}
      >
        Completed
        {showCompleted ? (
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
      {showCompleted && (
        <ul>
          {completedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              remove={remove}
              setCompleted={setCompleted}
            ></TodoItem>
          ))}
        </ul>
      )}
    </div>
  );
}

function useTodos(initialTodos: Todo[] = []) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  function add(newTodo: NewTodo): Todo {
    const todo = { ...newTodo, completed: false, id: todos.length + 1 };
    setTodos([...todos, todo]);
    return todo;
  }

  function remove(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function setCompleted(todo: Todo, completed: boolean) {
    const index = todos.findIndex((t) => t.id === todo.id);
    if (index === -1) {
      throw new Error("Cannot find todo with id " + todo.id);
    }
    setTodos(Object.assign([], todos, { [index]: { ...todo, completed } }));
  }

  return { todos, add, remove, setCompleted };
}
