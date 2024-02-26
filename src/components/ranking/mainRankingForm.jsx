import { Card, Col, Image, Row } from "react-bootstrap";
import RankIcon from "../../assets/images/rank1.svg";

const MainRankingForm = () => {
  return (
    <Card
      className="custom-bg my-card mt-3 px-4 py-3"
      style={{
        borderRadius: "15px",
        backgroundColor: "#fff",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Card.Body className="item1">
        <Row>
          <Col md={1} lg={1}>
            <Image src={RankIcon} />
          </Col>
          <Col md={10} lg={10}>
            <Card.Title>열공한신프로 님</Card.Title>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default MainRankingForm;
