import React from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Order } from "../interfaces/Order";

export default function Orders({ onEdit, orders, user, updateOrders }) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Price</th>
                    <th>Expiration</th>
                </tr>
            </thead>
            <tbody>
                {orders
                    .map((order: Order, index: number) => (
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
                                        type="number"
                                        step=".01"
                                        onChange={updateOrders(index)}
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
    )
}