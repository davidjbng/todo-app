import React from "react";
import { TodoList } from "./TodoList";

const exampleTodos = [
  {
    id: 1,
    title: "hello",
    completed: false,
  },
  {
    id: 2,
    title: "click me",
    completed: false,
  },
  {
    id: 3,
    title: "I'm completed",
    completed: true,
  },
];

function App() {
  return (
    <div>
      <TodoList name="Example Todos" initialTodos={exampleTodos}></TodoList>
    </div>
  );
}

export default App;
