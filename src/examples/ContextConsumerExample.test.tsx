import React from "react";
import { render, screen } from "test-utils";
import ContextConsumerExample from "./ContextConsumerExample";

test("should render", () => {
  render(<ContextConsumerExample></ContextConsumerExample>);

  expect(screen.getByText("Hello, ThemeContext!")).toBeInTheDocument();
});
