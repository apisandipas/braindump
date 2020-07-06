import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import { isValidEmail } from "utils/validation";
import { AuthFormWrapper } from "components/AuthForm";
import { FORGOT_PASSWORD_MUTATION } from "utils/queries";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD_MUTATION);

  const onSubmit = async event => {
    event.preventDefault();
    const errors = [];

    if (!email || !isValidEmail(email)) {
      errors.push("Please enter a valid email!");
    }

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setFormErrors([]);
      const response = await forgotPassword({ variables: { email } });
      const forgotPasswordResponse = response?.data?.forgotPassword;

      if (forgotPasswordResponse) {
        const { ok } = forgotPasswordResponse;
        if (ok) {
          setShowSuccessMessage(true);
        }
      }
    } catch (error) {
      setFormErrors([error.message]);
    } finally {
      setEmail("");
    }
  };

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
              <H5>Something slip your mind?</H5>
              <form onSubmit={onSubmit}>
                <FormGroup>
                  <label htmlFor="email">Reset your password here: </label>
                  <FormControl
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="text"
                    placeholder="Email"
                  />
                </FormGroup>
                <Button block primary mb4 disabled={loading}>
                  {loading ? "..." : "Request Password Reset"}
                </Button>
              </form>
              {showSuccessMessage && (
                <Alert success>Request successful. Check your email!</Alert>
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

export default ForgotPassword;
