import React, { useState, createContext } from "react";
import decode from "jwt-decode";
import { Route, Redirect } from "react-router-dom";
const AUTH_TOKEN_NAME = "noteapp-token";
const REFRESH_TOKEN_NAME = "noteapp-refreshToken";

export const isAuthenticated = () => {
  const token = localStorage.getItem(AUTH_TOKEN_NAME);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_NAME);
  try {
    decode(token);
    decode(refreshToken);
  } catch (err) {
    return false;
  }

  return true;
};

export const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem(AUTH_TOKEN_NAME, accessToken);
  localStorage.setItem(REFRESH_TOKEN_NAME, refreshToken);
};

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(isAuthenticated());

  const toggleAuth = () => {
    setIsAuth(!isAuth);
  };

  const logout = () => {
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuth,
        logout,
        toggleAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
