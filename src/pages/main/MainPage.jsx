import { Col, Container, Image, Row } from "react-bootstrap";
import CalandarForm from "../../components/calandar/calandarForm";
import MainRankingForm from "../../components/ranking/mainRankingForm";
import MainAlgorithmForm from "../../components/algorithm/mainAlgorithmForm";
import MainQAForm from "../../components/qa/mainQAForm";
import "./MainPage.css";
import RankIcon from "../../assets/images/rank.png";
import AlgoIcon from "../../assets/images/algo.png";

const MainPage = () => {
  return (
    <>
      <Container>
        <Row className="my-5">
          <Col md={6} className="fw-bold py-5 px-4 py-4">
            <CalandarForm />
          </Col>
          <Col sm={12} md={6} className="px-4 py-5">
            {/* <div
              className="fw-bold"
              style={{ fontSize: "30px", fontFamily: "GyeonggiTitleM" }}
            >
              😎 유저 랭킹
            </div> */}

            <div style={{ display: "flex" }}>
              <Image src={RankIcon} height={"50"} />
              <div
                className="pt-1 px-3 fw-bold"
                style={{ fontSize: "30px", fontFamily: "GyeonggiTitleM" }}
              >
                유저랭킹
              </div>
            </div>
            <MainRankingForm />

            <div style={{ display: "flex", paddingTop: "1rem" }}>
              <Image src={AlgoIcon} height={"50"} />
              <div
                className="pt-1 px-2 fw-bold"
                style={{ fontSize: "30px", fontFamily: "GyeonggiTitleM" }}
              >
                오늘의 알고리즘
              </div>
            </div>

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
