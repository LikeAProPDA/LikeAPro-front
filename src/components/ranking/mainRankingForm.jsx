import { Card, Col, Image, Row } from "react-bootstrap";
import RankIcon from "../../assets/images/rank1.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/swiper-bundle.css"; // 이 부분이 중요합니다.

const MainRankingForm = () => {
  return (
    <Card
      className="custom-bg my-card mt-3 px-4"
      style={{
        borderRadius: "15px",
        backgroundColor: "#fff",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Card.Body className="item1">
        <Row>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            direction="vertical"
            autoHeight
            loop={true}
            autoplay={{ delay: 2000, disableOnInteraction: true }}
            onAutoplay={(swiper) => {
              console.log(swiper);
            }}
          >
            <SwiperSlide style={{ display: "flex", alignItems: "center" }}>
              <Col md={1} lg={1}>
                <Image src={RankIcon} />
              </Col>
              <Col md={10} lg={10}>
                <Card.Title>열공한신프로 님</Card.Title>
              </Col>
            </SwiperSlide>

            <SwiperSlide style={{ display: "flex", alignItems: "center" }}>
              <Col md={1} lg={1}>
                <Image src={RankIcon} />
              </Col>
              <Col md={10} lg={10}>
                <Card.Title>ss 님</Card.Title>
              </Col>
            </SwiperSlide>
          </Swiper>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default MainRankingForm;
