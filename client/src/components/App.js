import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BaseCss, BSThemeProvider } from "@apisandipas/bssckit";
import theme, { GlobalStyle } from "../theme";
import { PrivateRoute, AuthContext, AuthProvider } from "utils/auth";
import Home from "routes/Home";
import Login from "routes/Login";
import Register from "routes/Register";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL + "/graphql",
  request: async operation => {
    const token = localStorage.getItem("noteapp-token");
    const refreshToken = localStorage.getItem("noteapp-refreshToken");
    operation.setContext({
      headers: {
        "x-token": token || "",
        "x-refresh-token": refreshToken || ""
      }
    });
  }
});

function App() {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <BSThemeProvider theme={theme}>
          <BaseCss />
          <GlobalStyle />
          <Router>
            <Switch>
              <PrivateRoute path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </Router>
        </BSThemeProvider>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
