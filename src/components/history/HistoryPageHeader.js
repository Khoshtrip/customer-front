import React from "react";
import { Row, Col } from "react-bootstrap";

const HistoryPackageHeader = () => {
    return (
        <>
            <Row className="mb-1 d-flex" style={{ width: "100%" }}>
                <Col>
                    <h1 className="ms-4 float-start rounded-pill">History</h1>
                </Col>
                <hr className="my-2 border-primary" />
            </Row>
        </>
    );
};

export default HistoryPackageHeader;
