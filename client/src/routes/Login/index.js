import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Alert,
  H5,
  Div,
  Button,
  Container,
  Row,
  Col,
  FormGroup,
  FormControl
} from "@apisandipas/bssckit";
import styled from "styled-components";
import { setTokens } from "utils/auth";
import { isValidEmail } from "../../utils/validation";

const AuthFormWrapper = styled.div`
  margin-top: 10rem;
  background: #fff;
  padding: 1rem;
  box-shadow: 5px 5px 5px var(--nord5);

  label {
    font-size: 15px;
  }
`;

const LOGIN_MUTATION = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

function Login() {
  const history = useHistory();
  const location = useLocation();
  const [formError, setFormError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  console.log("loc", location.pathname);

  const onSubmit = async event => {
    event.preventDefault();

    if (!email || !isValidEmail(email)) {
      setFormError("Please enter an email!");
      return;
    }

    if (!password) {
      setFormError("Please enter a password!");
      return;
    }

    const response = await login({ variables: { email, password } });
    const { ok, token, refreshToken, errors } = response.data.login;

    if (ok) {
      setTokens(token, refreshToken);
      history.push("/");
    } else {
      console.error("error", errors);
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col xs={12} lg={4} lgOffset={4}>
            <AuthFormWrapper>
              <H5>Please login to continue </H5>
              <form onSubmit={onSubmit}>
                <FormGroup>
                  <label>Email:</label>
                  <FormControl
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                  />
                </FormGroup>
                <FormGroup>
                  <label>Password:</label>
                  <FormControl
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                  />
                </FormGroup>
                <Button block primary disabled={loading}>
                  {loading ? "..." : "Login"}
                </Button>

                {formError && <Alert danger>{formError}</Alert>}
              </form>
            </AuthFormWrapper>
            <Div textCenter mt4>
              <Link to="/register">Register</Link>
            </Div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
