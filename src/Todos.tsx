import React, { useState } from "react";

interface TodoItem {
  text: string;
}

export function Todos() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addNewTodo = () => {
    setTodos((current) => [...current, { text: newTodo }]);
    setNewTodo("");
  };

  return (
    <div>
      <input
        placeholder="Add something"
        value={newTodo}
        onChange={(event) => setNewTodo(event.target.value)}
      ></input>
      <button onClick={addNewTodo}>add</button>
      <ul>
        {todos.map((todo, i) => (
          <li key={i}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}
