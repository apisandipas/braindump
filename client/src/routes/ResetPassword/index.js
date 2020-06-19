import React, { useState } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import qs from "query-string";
import {
  Alert,
  H1,
  H5,
  H6,
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

const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password) {
      ok
    }
  }
`;

function ResetPassword() {
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD_MUTATION);

  const resetToken = qs.parse(location.search).token;

  if (!resetToken) {
    return (
      <Alert danger>
        You don't appear to have a reset token. Did you come here by mistaken?
      </Alert>
    );
  }

  const onSubmit = async event => {
    event.preventDefault();
    const errors = [];
    if (!password) {
      errors.push("Please enter a new password!");
    }

    if (!passwordConfirm) {
      errors.push("Please confirm your password!");
    }

    if (password !== passwordConfirm) {
      errors.push("Your password entries must match!");
    }

    if (password.length < 8 || passwordConfirm.length < 8) {
      errors.push("Your password entry must be a least 8 characters!");
    }

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setFormErrors([]);

      const response = await resetPassword({
        variables: { token: resetToken, password }
      });
      const resetPasswordResponse = response?.data?.resetPassword;

      if (resetPasswordResponse) {
        const { ok } = resetPasswordResponse;
        if (ok) {
          setShowSuccessMessage(true);
        }
      }
    } catch (error) {
      setFormErrors([error.message]);
    } finally {
      setPassword("");
      setPasswordConfirm("");
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col xs={12} md={6} mdOffset={3} lg={4} lgOffset={4}>
            <AuthFormWrapper>
              <H1 textCenter>🧠</H1>
              <H5>Password Reset</H5>
              <form onSubmit={onSubmit}>
                <FormGroup>
                  <label htmlFor="password">
                    Enter your new password here:{" "}
                  </label>
                  <FormControl
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="passwordConfirm">Confirm password: </label>
                  <FormControl
                    id="passwordConfirm"
                    value={passwordConfirm}
                    onChange={e => setPasswordConfirm(e.target.value)}
                    type="password"
                  />
                </FormGroup>
                <Button block primary mb4 disabled={loading}>
                  {loading ? "..." : "Reset Password"}
                </Button>
              </form>
              {showSuccessMessage && (
                <Alert success>
                  Password change successful.{" "}
                  <Link to="/login">Click here to log in.</Link>
                </Alert>
              )}
              {formErrors.length > 0 &&
                formErrors.map(message => (
                  <Alert danger mb1 key={message}>
                    {message}
                  </Alert>
                ))}
            </AuthFormWrapper>
            <Div textCenter mt4>
              <Link to="/register">Register</Link> |{" "}
              <Link to="/login">Login</Link>
            </Div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ResetPassword;
