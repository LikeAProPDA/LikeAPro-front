import { Col, Row } from "react-bootstrap";

const MainQAForm = () => {
  return (
    <div style={{ backgroundColor: "#fff" }} className="p-5">
      <Row className="px-5">
        <Col className="p-5">
          <div
            style={{ fontSize: "40px", color: "#0D6EFD", fontWeight: "bold" }}
          >
            Q&A
          </div>

          <div style={{ fontSize: "28px", fontWeight: "bold" }}>
            누구나 멘토 멘티가 되어
            <br /> 서로를 도와요!
          </div>
          <div className="my-3">
            강사님에게 물어보기 애매한 질문들,
            <br /> 혹은 내 차례가 오지 않을 것만 같은 QA
            <br /> 이제 온라인으로, 익명으로 물어보세요!
          </div>
          <div className="my-3">
            Q&A를 통해 서로가 멘토, 멘티가 되어
            <br /> 문제 해결에 앞장서는 Pro가 되어보세요
          </div>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
};

export default MainQAForm;
