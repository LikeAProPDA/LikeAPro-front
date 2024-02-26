import { Col, Container, Row } from "react-bootstrap";
import CalandarForm from "../../components/calandar/calandarForm";
import MainRankingForm from "../../components/ranking/mainRankingForm";
import MainAlgorithmForm from "../../components/algorithm/mainAlgorithmForm";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";

const MainPage = () => {
  return (
    <>
      {/* 메인화면 */}
      <Container>
        <Row className="my-5">
          <Col md={6} className="fw-bold py-5 px-4 py-4">
            <CalandarForm />
          </Col>
          <Col sm={12} md={6} className="px-4 py-5">
            <h2 className="fw-bold">😎 유저 랭킹</h2>
            <MainRankingForm />
            <h2 className="pt-5 fw-bold">🎯 오늘의 알고리즘</h2>
            <MainAlgorithmForm />
          </Col>
        </Row>
        <Row>
          <h2>Q&A</h2>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={50}
            slidesPerView={3}
            autoplay={{ delay: 1000, disableOnInteraction: false }}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            ...
          </Swiper>
        </Row>
      </Container>
    </>
  );
};

export default MainPage;
