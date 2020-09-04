import { screen, render, fireEvent } from "@testing-library/react";
import React from "react";
import { Todos } from "./Todos";

test("should show input for new todo", () => {
  render(<Todos />);
  const input = screen.getByPlaceholderText(/add something/i);
  expect(input).toBeVisible();
});
test("should add new todo", () => {
  render(<Todos />);
  const input = screen.getByPlaceholderText(/add something/i);
  const { todo } = addTodo(input);

  const todoElement = screen.getByText(todo);

  expect(todoElement).toBeVisible();
});
test("should clear new todo after adding", () => {
  render(<Todos />);
  const input = screen.getByPlaceholderText(/add something/i);
  addTodo(input);

  expect(input).toHaveValue("");
});
test("should remove todo ", () => {
  render(<Todos />);
  const input = screen.getByPlaceholderText(/add something/i);
  const { todo } = addTodo(input);

  const removeButton = screen.getByRole("button", { name: "Remove" });
  fireEvent.click(removeButton);

  const todoElement = screen.queryByText(todo);
  expect(todoElement).not.toBeInTheDocument();
});

function addTodo(input: HTMLElement) {
  const addButton = screen.getByRole("button", { name: "Add" });
  const todo = "Test Todo";
  fireEvent.change(input, { target: { value: todo } });
  fireEvent.click(addButton);

  return { todo };
}
