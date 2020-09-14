import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Todo, TodoList } from "./TodoList";

test("should show initial todos", () => {
  const initialTodo: Todo = { title: "test", id: "1", completed: false };

  render(<TodoList initialTodos={[initialTodo]} />);

  expect(screen.getByText(initialTodo.title)).toBeInTheDocument();
});
