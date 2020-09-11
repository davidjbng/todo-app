import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import React from "react";
import { TodosWithServer } from "./TodosWithServer";
import { server } from "./__mocks__/server";

beforeEach(() => {});

test("should load todos", async () => {
  server.use(
    rest.get("/todos", (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([{ title: "test1", id: 1 }]));
    })
  );

  render(<TodosWithServer />);

  expect(await screen.findByText("test1")).toBeInTheDocument();
});
test("should add new todo with api", async () => {
  server.use(
    rest.post("/todos", (req, res, ctx) => {
      return res(ctx.json({ title: "new todo", completed: false, id: 3 }));
    })
  );
  render(<TodosWithServer />);

  userEvent.type(screen.getByPlaceholderText(/add something/i), "new todo");
  userEvent.click(screen.getByRole("button", { name: /add/i }));

  expect(await screen.findByText("new todo")).toBeInTheDocument();
});
