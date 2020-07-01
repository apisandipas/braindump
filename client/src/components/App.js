import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { BaseCss, BSThemeProvider } from "@apisandipas/bssckit";
import theme, { GlobalStyle } from "../theme";
import client from "../client";
import { PrivateRoute, AuthProvider } from "utils/auth";
import Home from "routes/Home";
import Login from "routes/Login";
import Register from "routes/Register";
import ForgotPassword from "routes/ForgotPassword";
import ResetPassword from "routes/ResetPassword";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ApolloProvider client={client}>
          <BSThemeProvider theme={theme}>
            <BaseCss />
            <GlobalStyle />
            <Switch>
              <Redirect from="/" to="/notebook/all" exact />
              <PrivateRoute path="/notebook" exact component={Home} />
              <PrivateRoute
                path="/notebook/:notebookId"
                exact
                component={Home}
              />
              <PrivateRoute path="/notebook/all" exact component={Home} />
              <PrivateRoute
                path="/notebook/all/note/:noteId"
                exact
                component={Home}
              />
              <PrivateRoute
                path="/notebook/:notebookId/note/:noteId"
                exact
                component={Home}
              />
              <PrivateRoute path="/note/:noteId" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/reset-password" component={ResetPassword} />
            </Switch>
          </BSThemeProvider>
        </ApolloProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
