import React, { useState, useEffect } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import PaginationItems from "../components/core/PaginationItems";
import Khoshpinner from "../components/core/Khoshpinner";
import { showGlobalAlert } from "../components/core/KhoshAlert";
import HistoryPackageHeader from "../components/history/HistoryPageHeader";
import { HistoryApi } from "../apis/HistoryApi";
import { Link } from "react-router-dom";
import HistoryCard from "../components/history/HistoryCard";

const HistoryList = ({ data }) => {
    return (
        <Container
            className="pt-2 mb-3 g-4 justify-content-mx-center"
            md="auto"
        >
            {data.map((purchase, index) => (
                <HistoryCard key={index} purchase={purchase} />
            ))}
            {data.length === 0 && (
                <>
                    <h1 className="text-center">
                        You have not purchased a package before
                    </h1>
                </>
            )}
        </Container>
    );
};

const HistoryPage = () => {
    const [historyData, setHistoryData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchHistory = async () => {
        setIsLoading(true);

        await HistoryApi.getPurchaseHistory()
            .then((response) => {
                console.log(response);
                setHistoryData(response.data);
            })
            .catch((error) => {
                showGlobalAlert({
                    variant: "danger",
                    message: "Error fetching packages",
                });
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    if (isLoading) {
        return <Khoshpinner />;
    }
    return (
        <>
            <Container className="d-flex flex-column justify-content-center align-items-center mt-4 mb-2">
                <HistoryPackageHeader />
                <HistoryList data={historyData} />
            </Container>
        </>
    );
};

export default HistoryPage;
