import { useEffect, useState } from "react";
import {
    Badge,
    Container,
    ListGroup,
    Row,
    Col,
    Pagination,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import qaApi from "../../lib/apis/qaApi";
import { useSelector } from "react-redux";
import commentApi from "../../lib/apis/commentApi";
// import CustomNavbar from '../../components/common/nav/CustomNavbar';
const QAPage = () => {
    const [qas, setQas] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user.user);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // 한 페이지에 표시될 QA 수
    // Pagination 관련 함수
    const indexOfLastQA = currentPage * itemsPerPage;
    const indexOfFirstQA = indexOfLastQA - itemsPerPage;
    const currentQAs = qas.slice(indexOfFirstQA, indexOfLastQA);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
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
    return (
        <Container>
            <Row className="justify-content-between pt-3">
                <Col xs={6}>
                    <h5 className="lh-base fw-bold">✨지식투자 리스트</h5>
                </Col>
                <Col xs={6} className="text-end">
                    {user && (
                        <Link to={"/qas/write"} className="text-decoration-none">
                            UPLOAD{" "}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="currentColor"
                                className="bi bi-pencil-square"
                                viewBox="0 0 16 16"
                            >
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path
                                    fillRule="evenodd"
                                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                />
                            </svg>
                        </Link>
                    )}
                </Col>
            </Row>
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
                            <ListGroup.Item
                                action
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto text-truncate">
                                    <div className="fw-bold">
                                        {index + 1 + indexOfFirstQA} | {qa.title}
                                    </div>
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
            {/* Pagination */}
            <Pagination className="mt-3 justify-content-center">
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