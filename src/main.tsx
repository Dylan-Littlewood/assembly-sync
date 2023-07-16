import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorPage from "./error-page";
import { ThemeProvider } from "./lib/Theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
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
