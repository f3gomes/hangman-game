import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";
import { GlobalProvider } from "./context/global";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>
);
