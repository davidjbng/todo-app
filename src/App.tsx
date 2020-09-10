import React from "react";
import "./App.css";
import { Todos } from "./Todos";

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
    <div className="app-container">
      <Todos initialTodos={exampleTodos}></Todos>
    </div>
  );
}

export default App;
