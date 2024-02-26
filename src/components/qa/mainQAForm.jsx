import { Component } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";

const MainQAForm = () => {
  return (
    <Component>
      <Row>
        <Col>
          <h2 style={{ color: blue }}>Q&A</h2>
          <h2>누구나 멘토 멘티가 되어&nbsp;서로를 도와요!</h2>
          <div>
            강사님에게 물어보기 애매한 질문들,&nbsp;혹은 내 차례가 오지 않을
            것만 같은 QA&nbsp;이제 온라인으로, 익명으로 물어보세요!
          </div>
          <div>
            Q&A를 통해 서로가 멘토, 멘티가 되어&npsp;문제 해결에 앞장서는 Pro가
            되어보세요
          </div>
        </Col>
        <Col></Col>
      </Row>
    </Component>
  );
};

export default MainQAForm;
