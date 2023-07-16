import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const storedUser = localStorage.getItem("user");

const INITIAL_STATE = {
  currentUser: storedUser ? JSON.parse(storedUser) : null,
};

type authType = {
  currentUser: any;
  dispatch?: React.Dispatch<{ type: any; payload: any; }>
}
export const AuthContext = createContext<authType>(INITIAL_STATE);

export const AuthContextProvider = ({ children }: { children:JSX.Element }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
