import { createRoutesFromElements, Navigate, Route } from "react-router-dom";

import App from "@/App";
import ErrorPage from "@/error-page";

import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import { SignUp } from "@/pages/signup";
import { Login } from "@/pages/login";

const currentUser = false;

const RequireAuth = ({ children }:{ children:JSX.Element }) => {
  return currentUser ? children : <Navigate to="/Login" />;
};

export const routes =
  createRoutesFromElements(<>
    <Route
      path="/"
      element={<RequireAuth><App /></RequireAuth>}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<RequireAuth><Home /></RequireAuth>} />
        <Route
          path="/Dashboard"
          element={<RequireAuth><Dashboard /></RequireAuth>}
        />
      </Route>
    </Route>
    <Route
      path="/SignUp"
      element={<SignUp />}
    />
    <Route
      path="/Login"
      element={<Login />}
    />
  </>);