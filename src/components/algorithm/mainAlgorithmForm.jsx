import { Card, Col, Image, Row } from "react-bootstrap";

const MainAlgorithmForm = () => {
  return (
    <>
      <Card
        className="custom-bg my-card mt-3"
        style={{
          borderRadius: "15px",
          backgroundColor: "#fff",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Card.Body className="item1 px-5 py-4">
          <Row>
            <Col xl={6} xs={6} md={6}>
              <Card.Text style={{ fontSize: "20px", fontWeight: "bold" }}>
                피보나치 수 5
              </Card.Text>
              <Card.Subtitle className="mb-2 text-muted text-truncate">
                #구현 #다이나믹 프로그래밍
              </Card.Subtitle>
            </Col>
            <Col
              xl={3}
              xs={3}
              md={3}
              className="d-flex align-items-center justify-content-center"
            >
              <Image
                src="https://d2gd6pc034wcta.cloudfront.net/tier/4.svg"
                style={{ width: 50 }}
              ></Image>
            </Col>
            <Col
              xl={3}
              xs={3}
              md={3}
              className="d-flex justify-content-end align-items-center"
            >
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

      <Card
        className="custom-bg my-card mt-3"
        style={{
          borderRadius: "15px",
          backgroundColor: "#fff",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Card.Body className="item2 px-5 py-4">
          <Row>
            <Col xl={6} xs={6} md={6}>
              <Card.Text style={{ fontSize: "20px", fontWeight: "bold" }}>
                최고의 팀 만들기
              </Card.Text>
              <Card.Subtitle className="mb-2 text-muted text-truncate">
                #다이나믹 프로그래밍
              </Card.Subtitle>
            </Col>
            <Col
              xl={3}
              xs={3}
              md={3}
              className="d-flex align-items-center justify-content-center"
            >
              <Image
                src="https://d2gd6pc034wcta.cloudfront.net/tier/12.svg"
                style={{ width: 50 }}
              ></Image>
            </Col>
            <Col
              xl={3}
              xs={3}
              md={3}
              className="d-flex justify-content-end align-items-center"
            >
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
    </>
  );
};

export default MainAlgorithmForm;
