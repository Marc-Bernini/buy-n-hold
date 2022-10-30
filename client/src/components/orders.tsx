import React from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Order } from "../interfaces/Order";

export default function Orders({ onEdit, orders, user, updateOrders, deleteOrder }) {
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
                                        className="mx-auto text-center w-25"
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
                                        onClick={() => deleteOrder(order.id)}
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