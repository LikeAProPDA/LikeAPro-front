import React, { useEffect, useState } from "react";
import { Badge, Container, ListGroup, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import qaApi from '../../lib/apis/qaApi';
import commentApi from "../../lib/apis/commentApi";

const QAPage = () => {
    const [qas, setQas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // 한 페이지에 표시될 QA 수

    useEffect(() => {
        const fetchQAs = async () => {
            try {
                setLoading(true);
                const data = await qaApi.getQAboard();
                // 각 QA에 대한 댓글 수를 가져와서 저장
                const updatedQAs = await Promise.all(
                    data.qas.map(async (qa) => {
                        const comments = await commentApi.getCommentsForQA(qa.id);
                        console.log(comments);
                        return { ...qa, commentCount: comments.result.length };

                    })
                );
                setQas(updatedQAs);
                setLoading(false);

            } catch (error) {
                console.error("Error fetching QAs:", error);
                setLoading(false);
            }
        };

        fetchQAs();
    }, []);

    // Pagination 관련 함수
    const indexOfLastQA = currentPage * itemsPerPage;
    const indexOfFirstQA = indexOfLastQA - itemsPerPage;
    const currentQAs = qas.slice(indexOfFirstQA, indexOfLastQA);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Container>
            <br />
            <h5 className="lh-base fw-bold">✨지식투자 리스트</h5>

            <ListGroup>
                {loading ? (
                    <ListGroup.Item>Loading QAs...</ListGroup.Item>
                ) : (
                    currentQAs.map((qa, index) => (
                        <Link
                            key={qa.id}
                            to={`/qas/${qa.id}`} // Assuming there's a route for individual QA pages
                            className="text-decoration-none"
                        >
                            <ListGroup.Item action className="d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto text-truncate">
                                    <div className="fw-bold">{index + 1 + indexOfFirstQA} | {qa.title}</div>
                                    <div>{qa.content}</div>
                                </div>
                                <div className="d-flex flex-column justify-content-center align-items-end">
                                    <Badge bg="primary" pill>
                                        {qa.commentCount} {/* commentCount is available */}
                                    </Badge>
                                    <div>{qa.author.nickname}</div>
                                </div>
                            </ListGroup.Item>
                        </Link>
                    ))
                )}

            </ListGroup>

            {/* Pagination */}
            <Pagination className="mt-3">
                {Array.from({ length: Math.ceil(qas.length / itemsPerPage) }).map(
                    (_, index) => (
                        <Pagination.Item
                            key={index}
                            active={index + 1 === currentPage}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    )
                )}
            </Pagination>
        </Container>
    );
};

export default QAPage;
