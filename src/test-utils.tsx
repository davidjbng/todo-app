import { render, RenderOptions, RenderResult } from "@testing-library/react";
import React from "react";
import ThemeContext, { themes } from "./ThemeContext";

const AllTheProviders: React.FC<{}> = ({ children }) => {
  return (
    <ThemeContext.Provider value={themes.light}>
      {children}
    </ThemeContext.Provider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
): RenderResult => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
