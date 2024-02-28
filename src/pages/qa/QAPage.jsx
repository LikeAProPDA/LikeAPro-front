import React, { useEffect, useState } from "react";
import {
  Badge,
  Container,
  Table,
  Row,
  Col,
  Pagination,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import qaApi from "../../lib/apis/qaApi";
import { useSelector } from "react-redux";
import commentApi from "../../lib/apis/commentApi";
import MoneyIcon from "../../assets/images/money.png";
import { Button as MUIButton } from "@mui/material";

const QAPage = () => {
  const [qas, setQas] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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
        const updatedQAs = await Promise.all(
          data.qas.map(async (qa) => {
            const comments = await commentApi.getCommentsForQA(qa.id);
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
    <Container className="my-3">
      <Row className="justify-content-between pt-3">
        <Col xs={6} className="d-flex align-items-center">
          <Image src={MoneyIcon} width={"30"} />
          <div
            className="lh-base fw-bold mx-2"
            style={{ fontFamily: "GyeonggiTitleM", fontSize: "2rem" }}
          >
            지식투자 리스트
          </div>
        </Col>
        <Col xs={6} className="text-end">
          {user && (
            <Link to={"/qas/write"} className="text-decoration-none">
              <MUIButton size="large">질문하기</MUIButton>
            </Link>
          )}
        </Col>
      </Row>
      <Table striped hover responsive className="mt-2">
        <thead>
          <tr>
            <th className="text-center">번호</th>
            <th className="text-start">제목</th>
            <th className="text-end">닉네임</th>
            <th className="text-center">작성일</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center">
                Loading QAs...
              </td>
            </tr>
          ) : (
            currentQAs.map((qa, index) => (
              <tr key={qa.id}>
                <td className="text-center">{index + 1 + indexOfFirstQA}</td>
                <td>
                  <Link to={`/qas/${qa.id}`} className="text-decoration-none">
                    {qa.title}
                  </Link>
                  <Badge className="ms-1" bg="primary" pill>
                    {qa.commentCount}
                  </Badge>
                </td>

                <td className="text-end">{qa.author.nickname}</td>
                <td className="text-center">
                  {new Date(qa.createdAt)
                    .toLocaleDateString(undefined, {
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(" ", "")
                    .replace(".", "/")
                    .replace(".", "")}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
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
