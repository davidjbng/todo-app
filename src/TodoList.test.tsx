import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Todo, TodoList } from "./TodoList";

test("should show initial todos", () => {
  const initialTodo: Todo = { title: "test", id: 1, completed: false };

  render(<TodoList initialTodos={[initialTodo]} />);

  expect(screen.getByText(initialTodo.title)).toBeInTheDocument();
});
test("should add new todo and clear input", () => {
  render(<TodoList />);

  const input = screen.getByPlaceholderText(/add something/i);
  userEvent.type(input, "new todo");
  userEvent.click(screen.getByRole("button", { name: /add/i }));

  expect(screen.getByText("new todo")).toBeInTheDocument();
  expect(input).toHaveValue("");
});
test("should show completed state for todo", () => {
  const todo: Todo = { title: "test", id: 1, completed: true };
  render(<TodoList initialTodos={[todo]} />);

  expect(screen.getByRole("checkbox")).toBeChecked();
  expect(screen.getByText(todo.title)).toHaveClass("line-through");
});
test("should complete todo", () => {
  const todo: Todo = { title: "test", id: 1, completed: false };
  render(<TodoList initialTodos={[todo]} />);

  userEvent.click(screen.getByRole("checkbox"));

  expect(screen.getByRole("checkbox")).toBeChecked();
});
test("should uncomplete todo", () => {
  const todo: Todo = { title: "test", id: 1, completed: true };
  render(<TodoList initialTodos={[todo]} />);

  userEvent.click(screen.getByRole("checkbox"));

  expect(screen.getByRole("checkbox")).not.toBeChecked();
});
test("should remove todo", () => {
  const todo: Todo = { title: "test", id: 1, completed: false };
  render(<TodoList initialTodos={[todo]} />);

  userEvent.click(screen.getByRole("button", { name: /remove/i }));

  expect(screen.queryByText(todo.title)).not.toBeInTheDocument();
});
test("should show todo list name", () => {
  render(<TodoList name="todolist" />);

  expect(screen.getByText("todolist")).toBeInTheDocument();
});
