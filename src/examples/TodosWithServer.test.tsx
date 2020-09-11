import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import React from "react";
import { server } from "../__mocks__/server";
import { TodosWithServer } from "./TodosWithServer";

test("should load todos", async () => {
  server.use(
    rest.get("/todos", (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([{ title: "test1", id: 1 }]));
    })
  );

  render(<TodosWithServer />);

  expect(await screen.findByText("test1")).toBeInTheDocument();
});
test("should load todos (example with wait for disappearance)", async () => {
  server.use(
    rest.get("/todos", (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([{ title: "test1", id: 1 }]));
    })
  );
  render(<TodosWithServer />);

  await waitForElementToBeRemoved(screen.getByText("Loading..."));

  expect(screen.getByText("test1")).toBeInTheDocument();
});
test("should add new todo with api", async () => {
  server.use(
    rest.post("/todos", (req, res, ctx) => {
      return res(ctx.json({ ...JSON.parse(req.body as string), id: 1 }));
    })
  );
  render(<TodosWithServer />);

  userEvent.type(screen.getByPlaceholderText(/add something/i), "new todo");
  userEvent.click(screen.getByRole("button", { name: /add/i }));

  expect(await screen.findByText("new todo")).toBeInTheDocument();
});
