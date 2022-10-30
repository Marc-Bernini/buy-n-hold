import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, InputGroup, Spinner, Row } from "react-bootstrap";
import { useAppContext } from "../../contexts/AppContext";
import { Order } from "../../interfaces/Order";
import * as orderService from "../../services/order";

import "./Trade.css";

export default function Trade() {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token, setToken } = useAppContext();

  const order: Order = {
    price: null
  };

  const onSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    if (!form.checkValidity()) {
      return;
    }
    createOrder();
  }

  const createOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await orderService.createOrder(order, token);
      setLoading(false);

    } catch (error) {
      const { response } = error;
      let message: string;
      if (response.status === 403) {
        message = response.data;
      } else {
        message = "OUPS... Une erreur est survenue";
      }
      setError(message);
      setLoading(false);
    }
  }

  return (
    <Container className="bg-white py-5 my-auto">
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
        <Row className="align-items-center">
          <Form.Label column="lg" lg={2} htmlFor="price">
            Price
          </Form.Label>
          <Col lg="2">
            <Form.Control
              id="price"
              onChange={(e) => order.price = parseInt(e.target.value)}
              placeholder="100"
              required
              type="number"
            />
          </Col>

          <Col className="d-grid gap-2" lg="3">
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
                  "Ajouter une option d'achat"
              }
            </Button>
          </Col>
        </Row>
      </Form>
      <div className="Trade">
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>username</th>
                <th>price</th>
                <th>expiration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Example</td>
                <td>100$</td>
                <td>{new Date().toDateString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="stats"></div>
      </div>
    </Container>

  );
}
