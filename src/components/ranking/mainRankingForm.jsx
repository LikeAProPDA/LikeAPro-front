import { Card, Col, Image, Row } from "react-bootstrap";

import MedalIcon1 from "../../assets/images/medal1.png";
import MedalIcon2 from "../../assets/images/medal2.png";
import MedalIcon3 from "../../assets/images/medal3.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/swiper-bundle.css"; // 이 부분이 중요합니다.
import { useEffect, useState } from "react";
import { getRanking } from "../../lib/apis/rankingApi";

const MainRankingForm = () => {
  const [topThree, setTopThree] = useState([]);

  useEffect(() => {
    getRanking(0, 3).then((data) => {
      setTopThree(data.result);
    });
  }, []);

  return (
    <Card
      className="custom-bg my-card mt-3"
      style={{
        borderRadius: "15px",
        backgroundColor: "#fff",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Card.Body className="item1">
        <Row>
          <Swiper
            spaceBetween={50}
            modules={[Autoplay]}
            slidesPerView={1}
            direction="vertical"
            autoHeight
            loop={true}
            autoplay={{ delay: 2000, disableOnInteraction: true }}
          >
            <SwiperSlide style={{ display: "flex", alignItems: "center" }}>
              <Col md={2} lg={2}>
                <Image src={MedalIcon1} width={40} />
              </Col>
              <Col md={10} lg={10}>
                {topThree[0] !== undefined ? (
                  <div style={{ fontSize: "20px" }}>{topThree[0].nickname}</div>
                ) : null}
              </Col>
            </SwiperSlide>

            <SwiperSlide style={{ display: "flex", alignItems: "center" }}>
              <Col md={2} lg={2}>
                <Image src={MedalIcon2} width={40} />
              </Col>
              <Col md={10} lg={10}>
                {topThree[1] !== undefined ? (
                  <div style={{ fontSize: "20px" }}>{topThree[1].nickname}</div>
                ) : null}
              </Col>
            </SwiperSlide>

            <SwiperSlide style={{ display: "flex", alignItems: "center" }}>
              <Col md={2} lg={2}>
                <Image src={MedalIcon3} width={40} />
              </Col>
              <Col md={10} lg={10}>
                {topThree[2] !== undefined ? (
                  <div style={{ fontSize: "20px" }}>{topThree[2].nickname}</div>
                ) : null}
              </Col>
            </SwiperSlide>
          </Swiper>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default MainRankingForm;
