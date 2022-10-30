import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner
} from "react-bootstrap";
import Orders from "../../components/orders";
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
  const [ordersCopy, setOrdersCopy] = useState([]);
  const [user, setUser] = useState(null);
  const [onEdit, setOnEdit] = useState(false);
  const { token, setToken } = useAppContext();
  const [showAlert, setShowAlert] = useState(false);
  const [totalOrders, setTotalOrders] = useState(null);

  const getOrders = async () => {
    try {
      const { data } = await orderService.getOrders(token);
      const ordersFromDb: Array<Order> = data.orders;
      const userFromDb: User = data.user;
      setOrders(ordersFromDb);
      setOrdersCopy(ordersFromDb);
      setUser(userFromDb);
    } catch (error) {
      throw error;
    }
  }

  const cancel = () => {
    setOnEdit(false);
    setOrders(ordersCopy);
  }

  const deleteOrder = async (id: number) => {
    try {
      await orderService.deleteOrder(id, token);
      await getOrders();
    } catch (error) {
      setError("OUPS... Une erreur est survenue");
    }
  }

  const updateOrdersInApi = async () => {
    try {
      setOnEdit(false);
      const ordersToUpdate: Array<Order> = orders.filter(order => order.user.id === user?.id);
      await orderService.updateOrders(ordersToUpdate, token);
      setShowAlert(true);
    } catch (error) {
      setError("OUPS... Une erreur est survenue");
    }
  }

  const updateOrders = (index: number) => (event) => {
    const newOrders = orders.map((order, i) => {
      if (index === i) {
        return { ...order, price: event.target.value };
      }
      return order;
    });
    setOrders(newOrders);
  }


  const reducer = (previousValue: number, currentValue: number) => previousValue + currentValue;

  const getTotalOrders = (date: string) => {
    const initialValue = 0;
    const prices: Array<number> = orders
      .filter(order => order.expirationDate === date)
      .map(order => parseFloat(order.price));

    const total: number = prices.reduce(reducer, initialValue);
    setTotalOrders(total);
  }

  const getOrdersAverage = () => {
    const initialValue = 0;
    const numberOfOrders: number = orders.length;
    const prices: Array<number> = orders.map(order => parseFloat(order.price));
    const totalPrices = prices.reduce(reducer, initialValue);
    return totalPrices/numberOfOrders;
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
              onChange={(e) => order.price = e.target.value}
              placeholder="100"
              required
              type="number"
              step=".01"
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
      <Row className="align-items-center mt-3">
        <Col lg="2">
          {
            !onEdit &&
            <Button

              onClick={() => setOnEdit(!onEdit)}
              variant="primary"
            >
              Modifier
            </Button>
          }

          {
            onEdit &&
            <Row className="justify-content-around">
              <Col lg="4">
                <Button
                  onClick={updateOrdersInApi}
                  variant="success"
                >
                  Valider
                </Button>
              </Col>
              <Col lg="4">
                <Button
                  onClick={cancel}
                  variant="warning"
                >
                  Annuler
                </Button>
              </Col>
            </Row>
          }
        </Col>
        {
          showAlert &&
          <Col lg="6">
            <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
              Ordres dachats mis à jour !
            </Alert>
          </Col>
        }
      </Row>
      <Orders
        onEdit={onEdit}
        orders={orders}
        user={user}
        updateOrders={updateOrders}
        deleteOrder={deleteOrder}
      ></Orders>
      <Row className="align-items-center">
        <Form.Label column="lg" lg={4} htmlFor="date">
          {"Total des ordres d'achat à une date donnée"}
        </Form.Label>
        <Col lg="2">
          <Form.Control
            id="date"
            type="date"
            onChange={(event) => getTotalOrders(event.target.value)}
          />
        </Col>

        <Col className="bg-success text-white" lg="2">
          Total: {totalOrders}
        </Col>
      </Row>
      <Row className="align-items-center">
        <Form.Label column="lg" lg={3} htmlFor="date">
          {"Moyenne des ordres d'achats"}
        </Form.Label>

        <Col className="bg-success text-white" lg="2">
          Total: {getOrdersAverage()}
        </Col>
      </Row>
      <div className="stats"></div>
    </Container>
  );
}
