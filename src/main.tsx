import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./lib/Theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { AuthContextProvider } from "./context/AuthContext";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
