import React, { useEffect, useState } from "react";
import { Button, Badge, Container, ListGroup, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import qaApi from "../../lib/apis/qaApi";
import { useSelector } from "react-redux";
// import CustomNavbar from '../../components/common/nav/CustomNavbar';

const QAPage = () => {
  const [qas, setQas] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.user);

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
                // eslint-disable-next-line react/no-unknown-property
                class="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  // eslint-disable-next-line react/no-unknown-property
                  fill-rule="evenodd"
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
          qas.map((qa, index) => (
            <Link
              key={qa._id}
              to={`/qas/${qa.id}`} // Assuming there's a route for individual QA pages
              className="text-decoration-none"
            >
              <ListGroup.Item
                action
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto text-truncate">
                  <div className="fw-bold">
                    {index + 1} | {qa.title}
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
    </Container>
  );
};

export default QAPage;
