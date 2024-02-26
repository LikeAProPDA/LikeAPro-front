import { Col, Container, Row } from "react-bootstrap";
import CalandarForm from "../../components/calandar/calandarForm";
import MainRankingForm from "../../components/ranking/mainRankingForm";
import MainAlgorithmForm from "../../components/algorithm/mainAlgorithmForm";

const MainPage = () => {
  return (
    <>
      {/* 메인화면 */}
      <Container>
        <Row className="py-1">
          <Col md={6} className="px-4 py-5 my-5 fw-bold">
            <CalandarForm />
          </Col>
          <Col sm={12} md={6} className="px-4">
            <h2 className=" pt-5 mt-5 fw-bold">😎 유저 랭킹</h2>
            <MainRankingForm />
            <h2 className=" pt-5 fw-bold">🎯 오늘의 알고리즘</h2>
            <MainAlgorithmForm />
          </Col>
        </Row>
        <Row>
          <h2>Q&A</h2>
        </Row>
      </Container>
    </>
  );
};

export default MainPage;
