import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";


export default function Users({ user, index }) {
    return (
        <Col lg="3">
            <Card border="primary" style={{ width: '18rem' }}>
                <Card.Header>{index + 1}-{user.username}</Card.Header>
                <Card.Body>
                    <Card.Title>{user.total}</Card.Title>
                </Card.Body>
            </Card>
        </Col>
    )
}