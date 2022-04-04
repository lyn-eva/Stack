import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import AuthProvider from "./context/authProvider";
import DbProvider from "./context/dbProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <DbProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DbProvider>
    </AuthProvider>
  </React.StrictMode>
);
