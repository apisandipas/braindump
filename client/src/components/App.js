import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BaseCss, BSThemeProvider } from "@apisandipas/bssckit";
import theme, { GlobalStyle } from "../theme";
import client from "../client";
import { PrivateRoute, AuthContext, AuthProvider } from "utils/auth";
import Home from "routes/Home";
import Login from "routes/Login";
import Register from "routes/Register";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ApolloProvider client={client}>
          <BSThemeProvider theme={theme}>
            <BaseCss />
            <GlobalStyle />
            <Switch>
              <PrivateRoute path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </BSThemeProvider>
        </ApolloProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
