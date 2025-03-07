import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const HistoryCard = (key, purchase) => {
    return (
        <Card key={key} className="mb-3 shadow-sm" style={{ width: "100%" }}>
            <Card.Body>
                <Row>
                    <Col md={3}>
                        <strong>Package Name:</strong> {purchase.package_name}
                    </Col>
                    <Col md={3}>
                        <strong>Purchase Date:</strong>{" "}
                        {new Date(purchase.purchase_date).toLocaleDateString()}
                    </Col>
                    <Col md={2}>
                        <strong>Quantity:</strong> {purchase.quantity}
                    </Col>
                    <Col md={2}>
                        <strong>Total Price:</strong> ${purchase.total_price}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default HistoryCard;
