import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Table
} from "react-bootstrap";
import { useAppContext } from "../../contexts/AppContext";
import { Order } from "../../interfaces/Order";
import { User } from "../../interfaces/User";
import * as orderService from "../../services/order";

import "./Trade.css";

export default function Trade() {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [onEdit, setOnEdit] = useState(false);
  const { token, setToken } = useAppContext();

  const getOrders = async () => {
    try {
      const { data } = await orderService.getOrders(token);
      const ordersFromDb: Array<Order> = data.orders;
      const userFromDb: User = data.user;
      setOrders(ordersFromDb);
      setUser(userFromDb);
    } catch (error) {
      throw error;
    }
  }


  useEffect(() => {
    getOrders()
      .catch(error => setError("OUPS... Une erreur est survenue"));
  }, []);

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
      await getOrders();
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Price</th>
            <th>Expiration</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {orders
            .map((order, index) => (
              <tr key={index}>
                <td>{order.user.username}</td>
                <td>
                  {
                    user?.id === order.user.id &&
                    <Form.Control
                      placeholder="price"
                      aria-label="price"
                      value={order.price}
                      disabled={!onEdit || user?.id !== order.user.id}
                    />
                  }
                  {
                    user?.id !== order.user.id &&
                    order.price
                  }


                </td>
                <td>{order.expirationDate}</td>
                <td>
                  {
                    !onEdit && user?.id === order.user.id &&
                    <Button
                      disabled={user?.id !== order.user.id}
                      onClick={() => setOnEdit(!onEdit)}
                      variant="primary"
                    >
                      Modifier
                    </Button>
                  }

                  {
                    onEdit && user?.id === order.user.id &&
                    <>
                      <Button
                        className="mr-3"
                        disabled={user?.id !== order.user.id}
                        onClick={() => setOnEdit(!onEdit)}
                        variant="success"
                      >
                        Valider
                      </Button>
                      <Button
                        disabled={user?.id !== order.user.id}
                        onClick={() => setOnEdit(false)}
                        variant="warning"
                      >
                        Annuler
                      </Button>
                    </>
                  }
                </td>
                <td>
                  {
                    user?.id === order.user.id &&
                    <Button
                      variant="danger"
                      disabled={user?.id !== order.user.id}
                    >
                      Supprimer
                    </Button>
                  }
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="stats"></div>
    </Container>
  );
}
