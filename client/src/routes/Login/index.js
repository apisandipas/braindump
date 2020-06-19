import React, { useState, useContext } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Alert,
  H1,
  H5,
  Div,
  Button,
  Container,
  Row,
  Col,
  FormGroup,
  FormControl
} from "@apisandipas/bssckit";
import { setTokens, AuthContext } from "utils/auth";
import { isValidEmail } from "utils/validation";
import { AuthFormWrapper } from "components/AuthForm";

const LOGIN_MUTATION = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
    }
  }
`;

function Login() {
  const history = useHistory();
  const location = useLocation();
  const [formErrors, setFormErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { loading }] = useMutation(LOGIN_MUTATION);
  const { isAuthenticated } = useContext(AuthContext);

  const onSubmit = async event => {
    event.preventDefault();

    const errors = [];

    if (!email || !isValidEmail(email)) {
      errors.push("Please enter a valid email!");
    }

    if (!password) {
      errors.push("Please enter a password!");
    }

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setFormErrors([]);
      const response = await login({ variables: { email, password } });

      const loginResponse = response?.data?.login;

      if (loginResponse) {
        var { ok, token, refreshToken } = loginResponse;

        if (ok) {
          setTokens(token, refreshToken);
          const { from } = location.state || { from: { pathname: "/" } };
          history.push(from);
        }
      }
    } catch (error) {
      const msg = error.message.replace("GraphQL error:", "");
      setFormErrors([msg]);
      setEmail("");
      setPassword("");
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Container>
        <Row>
          <Col xs={12} md={6} mdOffset={3} lg={4} lgOffset={4}>
            <AuthFormWrapper>
              <H1 textCenter>🧠</H1> <H5>Please login to continue </H5>
              <form onSubmit={onSubmit}>
                <FormGroup>
                  <label htmlFor="email">Email:</label>
                  <FormControl
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="password">Password:</label>
                  <FormControl
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                  />
                </FormGroup>
                <Button block primary mb4 disabled={loading}>
                  {loading ? "..." : "Login"}
                </Button>

                {formErrors.length > 0 &&
                  formErrors.map(message => (
                    <Alert danger mb1 key={message}>
                      {message}
                    </Alert>
                  ))}
              </form>
            </AuthFormWrapper>
            <Div textCenter mt4>
              <Link to="/register">Register</Link> | {"  "}
              <Link to="/forgot-password">Reset Password</Link>
            </Div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
