import React, { useState } from "react";

export interface Todo {
  id: number;
  title: string;
}
type NewTodo = Omit<Todo, "id">;

interface Props {
  initialTodos?: Todo[];
}

export function Todos({ initialTodos = [] }: Props) {
  const [todoInput, setTodoInput] = useState("");
  const { todos, add, remove } = useTodos(initialTodos);

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
        {todos.map(({ title, id }) => (
          <div key={id}>
            <li>{title}</li>
            <button data-testid="remove-todo" onClick={() => remove(id)}>
              Remove
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

function useTodos(initialTodos: Todo[] = []) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  function add(newTodo: NewTodo): Todo {
    const todo = { ...newTodo, id: todos.length + 1 };
    setTodos([...todos, todo]);
    return todo;
  }

  function remove(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return { todos, add, remove };
}
