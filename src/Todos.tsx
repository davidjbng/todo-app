import React, { useState } from "react";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
type NewTodo = Omit<Todo, "id" | "completed">;

interface Props {
  initialTodos?: Todo[];
}

export function Todos({ initialTodos = [] }: Props) {
  const [todoInput, setTodoInput] = useState("");
  const { todos, add, remove, setCompleted } = useTodos(initialTodos);

  function addTodo() {
    add({ title: todoInput });
    setTodoInput("");
  }

  return (
    <div className="container mx-auto p-8 max-w-md">
      <div className="flex">
        <input
          className="px-2 py-1 bg-gray-100 placeholder-gray-700 rounded flex-grow mr-2"
          placeholder="Add something"
          value={todoInput}
          onChange={(event) => setTodoInput(event.target.value)}
        ></input>
        <button
          className="mx-2 px-2 py-1 bg-gray-100 hover:bg-gray-300 rounded ml-auto"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      <ul className="mt-2">
        {todos.map((todo) => (
          <li className="flex items-center" key={todo.id}>
            <input
              className="mr-2 my-1"
              type="checkbox"
              onChange={(event) => setCompleted(todo, event.target.checked)}
              checked={todo.completed}
            ></input>
            <div className={`${todo.completed ? "line-through" : ""}`}>
              {todo.title}
            </div>
            <button
              className="mx-2 rounded ml-auto"
              data-testid="remove-todo"
              onClick={() => remove(todo.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
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
