import React, { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
}

type NewTodo = Omit<Todo, "id">;

export function Todos() {
  const [todoInput, setTodoInput] = useState("");
  const { todos, add, remove } = useTodos();

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
            <button onClick={() => remove(id)}>Remove</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const abortController = new AbortController();
    const loadTodos = async () => {
      fetch("/todos", { signal: abortController.signal })
        .then((response) => response.json())
        .then((json) => setTodos(json))
        .catch((error) => console.log(error));
    };
    loadTodos();
    return () => {
      abortController.abort();
    };
  }, []);

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
