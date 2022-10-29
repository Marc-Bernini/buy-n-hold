import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import * as auth from "../../services/auth";
import { User } from "../../interfaces/User";

export default function Login() {
  const history = useHistory();
  const [validated, setValidated] = useState(false);
  const user: User = {
    username: null,
    password: null
  }

  const onSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    if (!form.checkValidity()) {
      return;
    }
    return createAndLogUser();
  }

  const createAndLogUser = async () => {
    try {
          const res = await auth.createAndLogin(user);
          // history.push("/trade?token=test");
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <Container className="my-auto">
      <Form
        noValidate
        onSubmit={onSubmit}
        validated={validated}
      >
        <Form.Group
          as={Col}
          className="mb-3 mx-auto"
          controlId="username"
          lg="3"
          xs="10"
        >
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              onChange={(e) => user.username = e.target.value}
              placeholder="Username"
              required
              type="text"
            />
            <Form.Control.Feedback type="invalid">
              Please fill your username
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group
          as={Col}
          className="mb-3 mx-auto"
          controlId="password"
          lg="3"
          xs="10"
        >
          <Form.Label>Password</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              onChange={(e) => user.password = e.target.value}
              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$"
              placeholder="Password"
              required
              type="password"
            />
            <Form.Control.Feedback type="invalid">
              Please fill your password. It must contains at least one lowercase letter, one capital letter, one number
              and one special character
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
