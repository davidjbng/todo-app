import React, { useEffect, useState } from "react";

interface TodoItem {
  title: string;
}

export function Todos() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");

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

  const addNewTodo = () => {
    setTodos([...todos, { title: newTodo }]);
    setNewTodo("");
  };

  const removeTodoAt = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input
        placeholder="Add something"
        value={newTodo}
        onChange={(event) => setNewTodo(event.target.value)}
      ></input>
      <button onClick={addNewTodo}>Add</button>
      <ul>
        {todos.map((todo, i) => (
          <div key={i}>
            <li>{todo.title}</li>
            <button onClick={() => removeTodoAt(i)}>Remove</button>
          </div>
        ))}
      </ul>
    </div>
  );
}
