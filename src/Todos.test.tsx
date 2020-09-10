import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Todo, Todos } from "./Todos";

test("should show initial todos", () => {
  const initialTodo: Todo = { title: "test", id: 1, completed: false };

  render(<Todos initialTodos={[initialTodo]} />);

  expect(screen.getByText(initialTodo.title)).toBeInTheDocument();
});
test("should add new todo and clear input", () => {
  render(<Todos />);

  const input = screen.getByPlaceholderText(/add something/i);
  fireEvent.change(input, { target: { value: "new todo" } });
  fireEvent.click(screen.getByRole("button", { name: /add/i }));

  expect(screen.getByText("new todo")).toBeInTheDocument();
  expect(input).toHaveValue("");
});
test("should show completed state for todo", () => {
  const todo: Todo = { title: "test", id: 1, completed: true };
  render(<Todos initialTodos={[todo]} />);

  expect(screen.getByRole("checkbox")).toBeChecked();
});
test("should complete todo", () => {
  const todo: Todo = { title: "test", id: 1, completed: false };
  render(<Todos initialTodos={[todo]} />);

  fireEvent.click(screen.getByRole("checkbox"));

  expect(screen.getByRole("checkbox")).toBeChecked();
});
test("should uncomplete todo", () => {
  const todo: Todo = { title: "test", id: 1, completed: true };
  render(<Todos initialTodos={[todo]} />);

  fireEvent.click(screen.getByRole("checkbox"));

  expect(screen.getByRole("checkbox")).not.toBeChecked();
});
test("should remove todo ", () => {
  const todo: Todo = { title: "test", id: 1, completed: false };
  render(<Todos initialTodos={[todo]} />);

  fireEvent.click(screen.getByTestId("remove-todo"));

  expect(screen.queryByText(todo.title)).not.toBeInTheDocument();
});
