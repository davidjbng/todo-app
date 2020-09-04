import React, { useState } from "react";

interface TodoItem {
  text: string;
}

export function Todos() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addNewTodo = () => {
    setTodos([...todos, { text: newTodo }]);
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
            <li>{todo.text}</li>
            <button onClick={() => removeTodoAt(i)}>Remove</button>
          </div>
        ))}
      </ul>
    </div>
  );
}
