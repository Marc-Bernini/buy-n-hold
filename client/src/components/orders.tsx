import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";


export default function Orders({ orders, user }) {
    const [onEdit, setOnEdit] = useState(false);

    return (
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
    )
}