import { Card, Col, Image, Row } from "react-bootstrap";
import RankIcon from "../../assets/images/rank1.svg";

const MainRankingForm = () => {
  //   const listStyle = {
  //     backgroundColor: "#ffcc00", // 배경색을 원하는 색상으로 설정
  //   };
  return (
    <Card className="custom-bg my-card mt-3 px-4 py-3">
      <Card.Body className="item1">
        <Row>
          <Col md={1} lg={1}>
            <Image src={RankIcon} />
          </Col>
          <Col md={10} lg={10}>
            <Card.Text>열공한신프로 님</Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default MainRankingForm;
