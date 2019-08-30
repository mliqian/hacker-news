import React from "react";

let ThemeContext = React.createContext({ theme: "light" });

export let ThemeProvider = ThemeContext.Provider;
export let ThemeConsumer = ThemeContext.Consumer;

export default ThemeContext;
