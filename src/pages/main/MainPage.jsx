import { Col, Container, Row } from "react-bootstrap";
import CalandarForm from "../../components/calandar/calandarForm";
import MainRankingForm from "../../components/ranking/mainRankingForm";
import MainAlgorithmForm from "../../components/algorithm/mainAlgorithmForm";
import MainQAForm from "../../components/qa/mainQAForm";

const MainPage = () => {
  return (
    <>
      {/* 메인화면 */}
      <Container>
        <Row className="my-5">
          <Col md={6} className="fw-bold py-5 px-4 py-4">
            <CalandarForm />
          </Col>
          <Col sm={12} md={6} className="px-4 py-5">
            <h2 className="fw-bold">😎 유저 랭킹</h2>
            <MainRankingForm />
            <h2 className="pt-5 fw-bold">🎯 오늘의 알고리즘</h2>
            <MainAlgorithmForm />
          </Col>
        </Row>
      </Container>
      <Container fluid className="px-0 mx-0">
        <MainQAForm />
      </Container>
    </>
  );
};

export default MainPage;
