import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import { GlobalProvider } from "./context/champion";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>
);
