import React, { useContext } from "react";
import ThemeContext from "../ThemeContext";

export default function ContextConsumerExample() {
  const theme = useContext(ThemeContext);

  return (
    <div style={{ background: theme.background, color: theme.foreground }}>
      Hello, ThemeContext!
    </div>
  );
}
