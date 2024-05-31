import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MemberContextProvider } from "./context/memberContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MemberContextProvider>
      <App />
    </MemberContextProvider>
  </React.StrictMode>
);
