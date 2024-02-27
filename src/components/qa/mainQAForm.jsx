import { Col, Row, Image } from "react-bootstrap";
import QAMainImg from "../../assets/images/QAMainImage.png";

const MainQAForm = () => {
  return (
    <div style={{ backgroundColor: "#fff" }} className="p-5">
      <Row className="p-5">
        <Col xl={4} md={12} className="px-3 d-flex justify-content-center">
          {" "}
          <div className="mb-3">
            <div
              style={{ fontSize: "45px", color: "#0D6EFD", fontWeight: "bold" }}
            >
              Q&A
            </div>
            <div
              className="mt-2"
              style={{ fontSize: "28px", fontWeight: "bold" }}
            >
              누구나 멘토 멘티가 되어
              <br /> 서로를 도와요!
            </div>
            <div className="mt-5" style={{ fontSize: "20px" }}>
              강사님에게 물어보기 애매한 질문들,
              <br /> 혹은 내 차례가 오지 않을 것만 같은 QA
              <br /> 이제 온라인으로, 익명으로 물어보세요!
            </div>
            <div className="my-3" style={{ fontSize: "20px" }}>
              Q&A를 통해 서로가 멘토, 멘티가 되어
              <br /> 문제 해결에 앞장서는 Pro가 되어보세요
            </div>
          </div>
        </Col>
        <Col
          xl={8}
          md={12}
          className="d-flex justify-content-end align-items-center"
        >
          <Image style={{ width: "100%" }} src={QAMainImg} />
        </Col>
      </Row>
    </div>
  );
};

export default MainQAForm;
