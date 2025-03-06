import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { TransactionApi } from "../apis/TransactionsApi";
import { useNavigate, useParams } from "react-router-dom";
import { showGlobalAlert } from "../components/core/KhoshAlert";

const PurchasePage = () => {
    const transactionId = useParams();
    const [cardData, setCardData] = useState({
        card_number: "",
        expiration_date_month: "",
        expiration_date_year: "",
        pin: "",
        cvv2: "",
    });

    const navigate = useNavigate();

    const [touch, setTouch] = useState({});
    const [errors, setErrors] = useState({});

    const handlePurchase = async (e) => {
        e.preventDefault();

        console.log({
            ...cardData,
            expiration_date: `${cardData.expiration_date_year}/${cardData.expiration_date_month}`,
        });

        TransactionApi.purchaseTransaction(transactionId.transactionId, {
            ...cardData,
            expiration_date: `${cardData.expiration_date_month}/${cardData.expiration_date_year}`,
        })
            .then((_) => {
                showGlobalAlert({
                    variant: "success",
                    message: "your purchased the package!",
                });
                navigate("/history");
            })
            .catch((error) => {
                showGlobalAlert({
                    variant: "danger",
                    message: error.message || "your purchased had an error!",
                });
                navigate("/packages/");
                console.log(error);
            });
    };

    const handleCancel = async () => {
        TransactionApi.cancelTransaction(transactionId.transactionId)
            .then((_) => {})
            .catch((_) => {})
            .finally((_) => {
                showGlobalAlert({
                    variant: "danger",
                    message: "your purchase got cancled!",
                });
                navigate("/history");
            });
    };

    const handleChange = (e) => {
        const value = e.target.value.replace(/[۰-۹]/g, (d) =>
            "۰۱۲۳۴۵۶۷۸۹".indexOf(d)
        );
        setCardData({ ...cardData, [e.target.name]: value });
        validateField(e.target.name, value);
        setTouch({ ...touch, [e.target.name]: true });
    };

    const validateField = (fieldName, value) => {
        let newErrors = { ...errors };
        switch (fieldName) {
            case "card_number":
                newErrors.card_number =
                    isNaN(value) || value.length != 16 ? "Format invalid!" : "";
                break;

            case "cvv2":
                newErrors.cvv2 =
                    isNaN(value) || value.length < 3 ? "CVV2 incorrect!" : "";
                break;

            case "expiration_date_month":
                newErrors.expiration_date_month =
                    isNaN(value) ||
                    value.length != 2 ||
                    Number(value) > 12 ||
                    Number(value) < 1
                        ? "Date format incorrect!"
                        : "";
                break;
            case "expiration_date_year":
                newErrors.expiration_date_year =
                    isNaN(value) || value.length != 2
                        ? "Date format incorrect!"
                        : "";
                break;
            case "pin":
                newErrors.pin =
                    isNaN(value) || value.length != 4
                        ? "Pin must be four digits!"
                        : "";

            default:
                break;
        }
        setErrors(newErrors);
    };

    return (
        <Container className="mt-4">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Purchase Page</Card.Title>
                            <Form onSubmit={handlePurchase}>
                                <Form.Group controlId="formCardNumber">
                                    <Form.Label>Card Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="card_number"
                                        placeholder="Enter card number"
                                        value={cardData.card_number}
                                        onChange={(e) => handleChange(e)}
                                        required
                                        isValid={
                                            touch.card_number &&
                                            !errors.card_number
                                        }
                                        isInvalid={!!errors.card_number}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.card_number}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formCvv2">
                                    <Form.Label>CVV2</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="cvv2"
                                        placeholder="Enter CVV2"
                                        value={cardData.cvv2}
                                        onChange={(e) => handleChange(e)}
                                        required
                                        isValid={touch.cvv2 && !errors.cvv2}
                                        isInvalid={!!errors.cvv2}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.cvv2}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Row>
                                    <Form.Label>Expiration Date</Form.Label>
                                    <Col>
                                        <Form.Group controlId="formExpirationDateMonth">
                                            <Form.Control
                                                type="text"
                                                name="expiration_date_month"
                                                placeholder="MM"
                                                value={
                                                    cardData.expiration_date_month
                                                }
                                                onChange={(e) =>
                                                    handleChange(e)
                                                }
                                                required
                                                isValid={
                                                    touch.expiration_date_month &&
                                                    !errors.expiration_date_month
                                                }
                                                isInvalid={
                                                    !!errors.expiration_date_month
                                                }
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                {errors.expiration_date_month}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formExpirationDateYear">
                                            <Form.Control
                                                type="text"
                                                name="expiration_date_year"
                                                placeholder="YY"
                                                value={
                                                    cardData.expiration_date_year
                                                }
                                                onChange={(e) =>
                                                    handleChange(e)
                                                }
                                                required
                                                isValid={
                                                    touch.expiration_date_year &&
                                                    !errors.expiration_date_year
                                                }
                                                isInvalid={
                                                    !!errors.expiration_date_year
                                                }
                                            />
                                        </Form.Group>

                                        <Form.Control.Feedback type="invalid">
                                            {errors.expiration_date_year}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Row>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="pin"
                                        placeholder="Enter password"
                                        value={cardData.pin}
                                        onChange={(e) => handleChange(e)}
                                        required
                                        isValid={touch.pin && !errors.pin}
                                        isInvalid={!!errors.pin}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.pin}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button variant="outline-primary" type="submit">
                                    Purchase
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    onClick={handleCancel}
                                    className="ml-2"
                                >
                                    Cancel
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PurchasePage;
