import { createRoutesFromElements, Navigate, Route } from "react-router-dom";

import App from "@/App";
import ErrorPage from "@/error-page";

import Dashboard from "@/pages/dashboard";
import SignUp from "@/pages/signup";
import Login from "@/pages/login";
import Build from "./pages/build";
import Schedule from "./pages/schedule";

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";


const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { currentUser } = useContext(AuthContext);
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
        <Route index element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route
          path="/Build"
          element={<RequireAuth><Build /></RequireAuth>}
        />
        <Route
          path="/Schedule"
          element={<RequireAuth><Schedule /></RequireAuth>}
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