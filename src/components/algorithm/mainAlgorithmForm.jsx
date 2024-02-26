import { Card, Col, Image, Row } from "react-bootstrap";

const MainAlgorithmForm = () => {
  //   const listStyle = {
  //     backgroundColor: "#ffcc00", // 배경색을 원하는 색상으로 설정
  //   };
  return (
    <div>
      <Card className="custom-bg my-card mt-3">
        <Card.Body className="item1 px-5 py-4">
          <Row>
            <Col xl xs md="6">
              <Card.Text style={{ fontSize: "20px", fontWeight: "bold" }}>
                알고리즘 1
              </Card.Text>
              <Card.Subtitle className="mb-2 text-muted">
                #구현 #dfs #bfs
              </Card.Subtitle>
            </Col>
            <Col xl xs md="3">
              <Image
                src="https://d2gd6pc034wcta.cloudfront.net/tier/1.svg"
                style={{ width: 50 }}
              ></Image>
            </Col>
            <Col xl xs md="3" className="d-flex justify-content-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                fill="currentColor"
                className="bi bi-check2-all"
                viewBox="0 0 16 16"
              >
                <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0" />
                <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708" />
              </svg>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="custom-bg my-card mt-3">
        <Card.Body className="item2 px-5 py-4">
          <Row>
            <Col xl xs md="6">
              <Card.Text style={{ fontSize: "20px", fontWeight: "bold" }}>
                알고리즘 2
              </Card.Text>
              <Card.Subtitle className="mb-2 text-muted">
                #구현 #dfs #bfs
              </Card.Subtitle>
            </Col>
            <Col xl xs md="3">
              <Image
                src="https://d2gd6pc034wcta.cloudfront.net/tier/11.svg"
                style={{ width: 50 }}
              ></Image>
            </Col>
            <Col xl xs md="3" className="d-flex justify-content-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                fill="currentColor"
                className="bi bi-check2-all"
                viewBox="0 0 16 16"
                color="blue"
              >
                <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0" />
                <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708" />
              </svg>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MainAlgorithmForm;
