import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorPage from "./error-page";
import Navigation from "./components/navigation";
import "./index.css";


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
  <Navigation />
    <RouterProvider router={router} />
  </React.StrictMode>
);
