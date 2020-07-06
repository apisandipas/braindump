import React, { useState, useContext } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
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
import { REGISTER_MUTATION } from "utils/queries";

function Register() {
  const history = useHistory();
  const [formErrors, setFormErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [register, { loading }] = useMutation(REGISTER_MUTATION);
  const { isAuthenticated } = useContext(AuthContext);

  const validate = () => {
    const errors = [];

    if (!email || !isValidEmail(email)) {
      errors.push("Please enter a valid email.");
    }

    if (!password) {
      errors.push("Please enter a password.");
    }

    if (!password.length >= 8) {
      errors.push("Please enter a password of at length 8 characters");
    }

    if (!passwordConfirm || passwordConfirm !== password) {
      errors.push("Please confirm your password");
    }

    const isValid = errors.length === 0;
    !isValid && setFormErrors(errors);
    return isValid;
  };

  const onSubmit = async event => {
    event.preventDefault();

    if (!validate()) {
      console.log("is not valid!");
      return;
    }

    try {
      const response = await register({ variables: { email, password } });
      const registerResponse = response?.data?.register;

      if (registerResponse) {
        const { ok, token, refreshToken } = registerResponse;
        if (ok) {
          setTokens(token, refreshToken);
          history.push("/");
        }
      }
    } catch (error) {
      const msg = error.message.replace("GraphQL error:", "");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      setFormErrors([msg]);
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
              <H1 textCenter>
                <span role="img" aria-label="Braindump">
                  🧠
                </span>
              </H1>
              <H5>Sign up to join the action! </H5>
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

                <FormGroup>
                  <label htmlFor="passwordConfirm">Confirm password:</label>
                  <FormControl
                    id="passwordConfirm"
                    value={passwordConfirm}
                    onChange={e => setPasswordConfirm(e.target.value)}
                    type="password"
                  />
                </FormGroup>

                <Button block primary mb4 disabled={loading}>
                  {loading ? "..." : "Sign Up"}
                </Button>

                {formErrors.length > 0 &&
                  formErrors.map(message => (
                    <Alert danger mb2 key={message}>
                      {message}
                    </Alert>
                  ))}
              </form>
            </AuthFormWrapper>
            <Div textCenter mt4>
              <Link to="/login">Have an account? Login here.</Link> |{" "}
              <Link to="/forgot-password">Reset Password</Link>
            </Div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
