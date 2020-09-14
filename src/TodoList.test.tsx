import { queryByText, render, screen } from "@testing-library/react";
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
test("should display completed todo at the bottom", () => {
  const completedTodo: Todo = { title: "completed", id: 1, completed: true };
  const todo: Todo = { title: "other", id: 2, completed: false };
  const otherTodo: Todo = { title: "other2", id: 3, completed: false };
  render(<TodoList initialTodos={[completedTodo, todo, otherTodo]} />);

  const [, , todo3] = screen.getAllByRole("listitem");

  expect(queryByText(todo3, completedTodo.title)).toBeInTheDocument();
});
test("should toggle completed todos", () => {
  const completedTodo: Todo = { title: "completed", id: 1, completed: true };
  render(<TodoList initialTodos={[completedTodo]} />);

  userEvent.click(screen.getByRole("button", { name: /completed/i }));
  expect(screen.queryByText(completedTodo.title)).not.toBeInTheDocument();

  userEvent.click(screen.getByRole("button", { name: /completed/i }));
  expect(screen.getByText(completedTodo.title)).toBeInTheDocument();
});
