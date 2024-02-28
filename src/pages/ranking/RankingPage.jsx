import { useEffect, useState } from "react";
import { Container, Image, Pagination } from "react-bootstrap";
import { getRanking } from "../../lib/apis/rankingApi";
import { v4 as uuidv4 } from "uuid";
import medal1 from "../../assets/images/medal1.png";
import medal2 from "../../assets/images/medal2.png";
import medal3 from "../../assets/images/medal3.png";
import GreatImg from "../../assets/images/great.png";
import "./RankingPage.css";

const RankingPage = () => {
  const rankColor = ["247, 187, 37", "184, 184, 184", "224, 139, 55"];
  const medalImage = [medal1, medal2, medal3];
  const [ranking, setRanking] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRanking(
          (currentPage - 1) * itemsPerPage,
          itemsPerPage
        );
        setRanking(data.result);

        if (data.result.length > 0) {
          setTotalCount(data.result[0].totalCount);
        }
        console.log(data.result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [currentPage, totalCount]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container
      style={{
        maxWidth: "900px",
        margin: "auto",
        padding: "2rem 0",
        fontFamily: "GyeonggiTitleM",
      }}
    >
      <div style={{ paddingLeft: "3rem" }}>
        <div style={{ display: "flex" }}>
          <Image src={GreatImg} width={60} style={{ marginRight: "0.5rem" }} />
          <div
            style={{
              fontWeight: "bolder",
              fontSize: "2.5rem",
              textTransform: "uppercase",
            }}
          >
            {/* <Image src={GreatImg} width={60} style={{ marginRight: "0.5rem" }} /> */}
            이달의 Pro
          </div>
        </div>

        <div
          style={{
            fontSize: "1.3rem",
            margin: "-0.2rem 0 1rem 0rem",
            textTransform: "uppercase",
            letterSpacing: "-0.5px",
            color: "",
          }}
        >
          이달의 프로에 도전하세요!
        </div>
      </div>
      <div
        style={{
          backgroundColor: "rgba(199, 220, 255, 0.5)",
          padding: "2rem 2rem",
          borderRadius: "2rem",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          key={uuidv4()}
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "0rem 4rem 1rem 4rem",
          }}
        >
          <span
            style={{
              flex: 0.2,
              marginRight: "1.5rem",
              fontSize: "1.1rem",
              fontWeight: "bolder",
            }}
          >
            순위
          </span>
          <span style={{ flex: 2, fontSize: "1.1rem", fontWeight: "bolder" }}>
            닉네임
          </span>
          <span style={{ fontSize: "1.1rem", fontWeight: "bolder" }}>
            스코어
          </span>
        </div>
        {ranking.map((rank) => (
          <div
            key={uuidv4()}
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "0.5rem 2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                padding: "0.6rem 2rem",
                borderRadius: "1.3rem",
                backgroundColor:
                  rank.ranking >= 1 && rank.ranking <= 3
                    ? `rgba(${rankColor[rank.ranking - 1]}, 0.7)`
                    : "white",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              {rank.ranking >= 1 && rank.ranking <= 3 ? (
                <img
                  src={medalImage[rank.ranking - 1]}
                  alt="medalImage"
                  style={{ width: "42px", height: "40px", marginRight: "2rem" }}
                />
              ) : (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "42px",
                    height: "40px",
                    marginRight: "2rem",
                    fontSize: "1.3rem",
                    fontWeight: "bolder",
                    color: "#015FFF",
                  }}
                >
                  {rank.ranking}
                </span>
              )}
              <span style={{ flex: 2, fontSize: "1.1rem" }}>
                {rank.nickname}
              </span>
              <span style={{ fontSize: "1.1rem" }}>{rank.totalScore} 점</span>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        {console.log(totalCount / itemsPerPage)}
        <Pagination className="mt-3">
          {Array.from({ length: Math.ceil(totalCount / itemsPerPage) }).map(
            (_, index) => (
              <Pagination.Item
                key={uuidv4()}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>
      </div>
    </Container>
  );
};
export default RankingPage;
