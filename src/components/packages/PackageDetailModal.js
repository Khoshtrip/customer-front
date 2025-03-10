import React, { useEffect, useState } from "react";
import {
    Modal,
    Button,
    Carousel,
    ListGroup,
    Row,
    Form,
    Stack,
} from "react-bootstrap";
import { PackagesApi } from "../../apis/PackagesApi"; // API call to fetch package details
import Khoshpinner from "../core/Khoshpinner";
import StarRating from "./StarRating";
import { showGlobalAlert } from "../core/KhoshAlert";

const PackageDetailModal = ({ show, onHide, packageId, onPurchasePackage }) => {
    const [packageData, setPackageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (quantity) => {
        if (quantity >= 1) setQuantity(quantity);
    };

    const getPackageData = (packageId) => {
        if (packageId) {
            setLoading(true);
            PackagesApi.getPackageById(packageId)
                .then((data) =>
                    setPackageData({
                        ...data.data,
                        photos: data.data.photos.map(
                            (image) =>
                                `http://api.khosh-trip.ir/api/image/${image}/download/`
                        ),
                    })
                )
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => setLoading(false));
        }
    };

    useEffect(() => {
        getPackageData(packageId);
    }, [packageId]);

    const onRatePackage = async (packageId, rating) => {
        await PackagesApi.ratePackage(packageId, rating)
            .then((response) => {
                showGlobalAlert({
                    variant: "success",
                    message: "thanks for the rating!",
                });
                getPackageData(packageId);
            })
            .catch(() => {
                showGlobalAlert({
                    variant: "warning",
                    message: "Unable to rate. You can only rate once!",
                });
            })
            .finally(() => {});
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            {loading && <Khoshpinner />}
            <Modal.Header closeButton>
                <Modal.Title>{packageData?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {packageData?.photos.length > 0 && (
                    <Carousel>
                        {packageData.photos.map((photo, index) => (
                            <Carousel.Item key={index}>
                                <div>
                                    <img
                                        className="d-block w-100 h-100"
                                        src={photo}
                                        alt="Package"
                                        style={{
                                            minBlockSize: "400px",
                                            maxBlockSize: "400px",
                                            objectFit: "contain",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: "white",
                                            overflow: "hidden",
                                        }}
                                    />
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                )}
                <ListGroup variant="flush" className="mt-4">
                    <ListGroup.Item>
                        <strong>Price:</strong> ${packageData?.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Start Date:</strong> {packageData?.start_date}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>End Date:</strong> {packageData?.end_date}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Available Units:</strong>{" "}
                        {packageData?.available_units}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Description:</strong> {packageData?.description}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <strong>rating:</strong> {packageData?.rating}/5 from{" "}
                        {packageData?.ratings_count} counts
                    </ListGroup.Item>

                    {packageData?.flight && (
                        <ListGroup.Item>
                            <strong>Flight:</strong> {packageData.flight.name}
                        </ListGroup.Item>
                    )}
                    {packageData?.hotel && (
                        <ListGroup.Item>
                            <strong>Hotel:</strong> {packageData.hotel.name}
                        </ListGroup.Item>
                    )}
                    {packageData?.activities?.length > 0 && (
                        <ListGroup.Item>
                            <strong>Activities:</strong>
                            <ul className="m-0 ps-3">
                                {packageData.activities.map((activity) => (
                                    <li key={activity.id}>{activity.name}</li>
                                ))}
                            </ul>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer
                as={Row}
                className="mx-4 justify-content-mx-center text-center flex-column justify-content-center align-items-center"
            >
                <Form>
                    <Stack direction="horizontal">
                        <Form.Control
                            type="number"
                            placeholder="Quantity"
                            value={quantity}
                            onChange={(e) => handleQuantityChange(e.target.value)}
                            style={{ width: "20%" }}
                        />
                        <Button
                            variant="success"
                            className="float-end rounded-pill px-4 ms-2 me-2"
                            style={{ width: "40%" }}
                            onClick={() =>
                                onPurchasePackage(packageId, quantity)
                            }
                        >
                            Purchase
                        </Button>
                        <StarRating
                            packageId={packageId}
                            style={{ width: "50%" }}
                            onRate={onRatePackage}
                        />
                    </Stack>
                </Form>
            </Modal.Footer>
        </Modal>
    );
};

export default PackageDetailModal;
