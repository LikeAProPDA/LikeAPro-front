import React, { useEffect, useState } from "react";
import { Badge, Container, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import qaApi from '../../lib/apis/qaApi';
// import CustomNavbar from '../../components/common/nav/CustomNavbar';

const QAPage = () => {
    const [qas, setQas] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchQAs = async () => {
            try {
                setLoading(true);
                const data = await qaApi.getQAboard();
                setQas(data.qas);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching QAs:", error);
                setLoading(false);
            }
        };

        fetchQAs();
    }, []);

    return (
        <Container>
            <h3>지식투자 리스트</h3>

            <ListGroup>
                {loading ? (
                    <ListGroup.Item>Loading QAs...</ListGroup.Item>
                ) : (
                    qas.map((qa, index) => (
                        <Link
                            key={qa._id}
                            to={`/qa/${qa._id}`} // Assuming there's a route for individual QA pages
                            className="text-decoration-none"
                        >
                            <ListGroup.Item action className="d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto text-truncate">
                                    <div className="fw-bold">{index + 1} | {qa.title}</div>
                                    <div>{qa.content}</div>
                                </div>
                                <div className="d-flex flex-column justify-content-center align-items-end">
                                    <Badge bg="primary" pill>
                                        {qa.commentCount} {/* Assuming commentCount is available */}
                                    </Badge>
                                    <div>{qa.author.nickname}</div>
                                </div>
                            </ListGroup.Item>
                        </Link>
                    ))
                )}
            </ListGroup>
        </Container>
    );
};

export default QAPage;
