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
    <div>
      <input
        placeholder="Add something"
        value={todoInput}
        onChange={(event) => setTodoInput(event.target.value)}
      ></input>
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              onChange={(event) => setCompleted(todo, event.target.checked)}
              checked={todo.completed}
            ></input>
            <div
              style={{ textDecoration: todo.completed ? "line-through" : "" }}
            >
              {todo.title}
            </div>
            <button data-testid="remove-todo" onClick={() => remove(todo.id)}>
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
