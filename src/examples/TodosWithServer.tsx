import React, { useEffect, useState } from "react";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}
type NewTodo = Omit<Todo, "id" | "completed">;

export function TodosWithServer() {
  const [todoInput, setTodoInput] = useState("");
  const { todos, add, remove, setCompleted, isLoading } = useTodos();

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
      {isLoading ? (
        <div>Loading...</div>
      ) : (
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
      )}
    </div>
  );
}

function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const loadTodos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/todos", {
          signal: abortController.signal,
        });
        setTodos(await response.json());
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTodos();
    return () => {
      abortController.abort();
    };
  }, []);

  async function add(newTodo: NewTodo): Promise<Todo> {
    try {
      const response = await fetch("/todos", {
        method: "post",
        body: JSON.stringify({ ...newTodo, completed: false }),
      });
      const todo = await response.json();
      setTodos([...todos, todo]);
      return Promise.resolve(todo);
    } catch (error) {
      console.error(error);
    }
  }

  async function remove(id: string) {
    try {
      await fetch(`/todos/${id}`, { method: "delete" });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  async function setCompleted(todo: Todo, completed: boolean) {
    try {
      await fetch(`/todos/${todo.id}`, {
        method: "put",
        body: JSON.stringify({ completed }),
      });
      const index = todos.findIndex((t) => t.id === todo.id);
      if (index === -1) {
        throw new Error("Cannot find todo with id " + todo.id);
      }
      setTodos(Object.assign([], todos, { [index]: { ...todo, completed } }));
    } catch (error) {
      console.error(error);
    }
  }

  return { todos, add, remove, setCompleted, isLoading };
}
