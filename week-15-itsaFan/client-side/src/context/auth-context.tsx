import { getUserLoginApi } from "../api/auth-api";
import { context_user, user_type } from "./context-type";
import React, { ReactNode, useEffect, useState } from "react";

type AuthContextProviderProps = {
  children: ReactNode;
};

 const AuthContext = React.createContext(context_user);

export function retrieveStoredToken() {
  const storedToken = localStorage.getItem("accessToken");
  return {
    token: storedToken,
  };
}

export function AuthContextProvider(props: AuthContextProviderProps) {
  const storedToken = retrieveStoredToken();
  const initialToken = storedToken.token || ''; 

  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(user_type);
  const userIsLoggedIn = !!token;

  const contextValue = {
    currentUser: {
      _id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    },
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  useEffect(() => {
    if (!token) {
      setUser(user_type);
    } else {
      getUserLoginApi(token)
        .then((res) => setUser(res.data))
        .catch((error) => console.log(error));
    }
    return () => {};
  }, [token]);

  function logoutHandler() {
    localStorage.removeItem("accessToken");
    setToken('')
  }
  function loginHandler(token: string) {
    localStorage.setItem('accessToken', token);
  }

  return (
    <AuthContext.Provider value={contextValue}> {props.children}</AuthContext.Provider>
  )
}

export default AuthContext