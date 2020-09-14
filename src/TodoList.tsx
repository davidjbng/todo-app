import React, { useState } from "react";
import { TodoItem } from "./TodoItem";
import { v4 as uuidv4 } from 'uuid';

export interface Todo {
  id: string;
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

  function addTodo() {
    add({ title: todoInput });
    setTodoInput("");
  }

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
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            remove={remove}
            setCompleted={setCompleted}
          ></TodoItem>
        ))}
      </ul>
    </div>
  );
}

function useTodos(initialTodos: Todo[] = []) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  function add(newTodo: NewTodo): Todo {
    const todo = { ...newTodo, completed: false, id: uuidv4() };
    setTodos([...todos, todo]);
    return todo;
  }

  function remove(id: string) {
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
