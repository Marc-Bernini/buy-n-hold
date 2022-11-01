import React, { useState } from "react";
import { useHistory } from "react-router";
import { Alert, Button, Col, Container, Form, InputGroup, Spinner } from "react-bootstrap";
import * as auth from "../../services/auth";
import { useAppContext } from "../../contexts/AppContext";

export default function Login() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({username: null, password: null});
  const { token, setToken } = useAppContext();

  const onSubmit = (event) => {
    const form = event.currentTarget;
    setUser(user);
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
      setLoading(true);
      setError(null);
      const {data} = await auth.createAndLogin(user);
      setLoading(false);
      setToken(data.jwt);
      history.push(`/trade?token=${data.jwt}`);
    } catch (error) {
      const { response } = error;
      let message: string;
      if (response.status === 401) {
        message = response.data;
      } else {
        message = "OUPS... Une erreur est survenue";
      }
      setError(message);
      setLoading(false);
    }
  }

  return (
    <Container className="my-auto">
      {
        error &&
        <Col className="mx-auto" lg="3" xs="10">
          <Alert variant="danger">
            {error}
          </Alert>
        </Col>
      }
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
          <Form.Label className="text-light">Pseudo</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              onChange={(e) => user.username = e.target.value}
              placeholder="Pseudo"
              required
              type="text"
            />
            <Form.Control.Feedback type="invalid">
              Le pseudo est obligatoire
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
          <Form.Label className="text-light">Mot de passe</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              onChange={(e) => user.password = e.target.value}
              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$"
              placeholder="Mot de passe"
              required
              type="password"
            />
            <Form.Control.Feedback type="invalid">
              Votre mot de passe doit contenir une lettre minuscule, une lettre majuscule, un chiffre
              et un caractère spécial.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Col className="d-grid gap-2 mx-auto" lg="3" xs="10">
          <Button type="submit" variant="primary" disabled={loading}>
            {
              loading ?
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                :
                "Valider"
            }
          </Button>
        </Col>
      </Form>
    </Container>
  );
}
