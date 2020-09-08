import { screen, render, fireEvent } from "@testing-library/react";
import { rest } from "msw";
import React from "react";
import { Todos } from "./Todos";
import { server } from "./__mocks__/server";

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
test("should load todos", async () => {
  server.use(
    rest.get("/todos", (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([{ title: "test" }]));
    })
  );

  render(<Todos />);

  expect(await screen.findByText("test")).toBeInTheDocument();
});

function addTodo(input: HTMLElement) {
  const addButton = screen.getByRole("button", { name: /add/i });
  const todo = "Test Todo";
  fireEvent.change(input, { target: { value: todo } });
  fireEvent.click(addButton);

  return { todo };
}
