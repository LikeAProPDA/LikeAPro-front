import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Col, Image, Row } from "react-bootstrap";
import {
  getIsSolved,
  getProblems,
  getProblemsUser,
} from "../../lib/apis/beakjoonApi";
import { v4 as uuidv4 } from "uuid";
const MainAlgorithmForm = () => {
  const [problems, setProblems] = useState([]);
  const isLogin = useSelector((state) => state.user);
  useEffect(() => {
    const fetchData = async () => {
      if (isLogin) {
        const data = await getProblemsUser(2);
        return data.result.problems;
      } else {
        const data = await getProblems(2);
        return data.result;
      }
    };
    fetchData().then((data) => setProblems(data));
  }, [isLogin]);
  const checkIsSolved = async (problemNum, problemId) => {
    try {
      const data = await getIsSolved(problemNum, problemId);
      if (data.result.isSolved) {
        const updatedProblems = problems.map((problem) => {
          if (problem.problem.problemNum === problemNum) {
            return {
              ...problem,
              isSolved: data.result.isSolved,
            };
          }
          return problem;
        });
        setProblems(updatedProblems);
      } else {
        alert("문제를 풀어주세요!");
      }
    } catch (error) {
      console.error("Error checking isSolved:", error);
    }
  };
  return (
    <>
      {Object.values(problems)?.map((problem) => (
        <Card
          key={uuidv4()}
          className="custom-bg my-card mt-3"
          style={{
            borderRadius: "15px",
            backgroundColor: "#fff",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Card.Body key={uuidv4()} className="item1 px-5 py-4">
            <Row>
              <Col xl={6} xs={6} md={6}>
                <Card.Title
                  href={problem.problem.link}
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  className="pt-2"
                  // eslint-disable-next-line no-unused-vars
                  onClick={(e) => window.open(problem.problem.link)}
                >
                  {problem.problem.algoName}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted text-truncate">
                  {problem.problem.tags.map((tag) => (
                    <span key={uuidv4()}>#{tag}</span>
                  ))}
                </Card.Subtitle>
              </Col>
              <Col
                xl={3}
                xs={3}
                md={3}
                className="d-flex align-items-center justify-content-center"
              >
                <Image
                  src={`https://d2gd6pc034wcta.cloudfront.net/tier/${problem.problem.level}.svg`}
                  style={{ width: 50 }}
                ></Image>
              </Col>
              {/* solved */}
              {problem.isSolved ? (
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
              ) : (
                <Col
                  xl={3}
                  xs={3}
                  md={3}
                  className="d-flex justify-content-end align-items-center"
                  onClick={() =>
                    checkIsSolved(
                      problem.problem.problemNum,
                      problem.problem._id
                    )
                  }
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
              )}
            </Row>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};
export default MainAlgorithmForm;