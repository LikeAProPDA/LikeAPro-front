import { useEffect, useState } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { getIsSolved, getProblems } from "../../lib/apis/beakjoonApi";
import { v4 as uuidv4 } from "uuid";

const MainAlgorithmForm = () => {
  const cookieName = "isRecommend";
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isRecommendCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith(`${cookieName}=`));

        const data = await getProblems(2);

        if (!isRecommendCookie) {
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 1);
          document.cookie = `${cookieName}=true; expires=${expirationDate.toUTCString()}`;

          data.result.map(
            (problem) =>
              (document.cookie = `problem_${
                problem.problemNum
              }=${JSON.stringify({
                problemNum: problem.problemNum,
                solved: false,
              })}`)
          );
        }

        const initialProblems = data.result.map((problem) => {
          const problemCookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith(`problem_${problem.problemNum}=`));

          const solvedFromCookie = problemCookie
            ? JSON.parse(problemCookie.split("=")[1]).solved
            : false;

          return {
            ...problem,
            solved: solvedFromCookie,
          };
        });

        setProblems(initialProblems);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const checkIsSolved = async (problemNum) => {
    try {
      const data = await getIsSolved(problemNum);

      console.log(problemNum);

      if (data.result.isSolved) {
        const updatedProblems = problems.map((problem) => {
          if (problem.problemNum === problemNum) {
            document.cookie = `problem_${problemNum}=${JSON.stringify({
              problemNum: problemNum,
              solved: true,
            })}`;
            return {
              ...problem,
              solved: data.result.isSolved,
            };
          }
          return problem;
        });

        setProblems(updatedProblems);
      }
    } catch (error) {
      console.error("Error checking isSolved:", error);
    }
  };

  return (
    <>
      {problems.map((problem) => (
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
                <Card.Text style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {problem.algoName}
                </Card.Text>
                <Card.Subtitle className="mb-2 text-muted text-truncate">
                  {problem.tags.map((tag) => (
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
                  src={`https://d2gd6pc034wcta.cloudfront.net/tier/${problem.level}.svg`}
                  style={{ width: 50 }}
                ></Image>
              </Col>

              {/* solved */}

              {problem.solved ? (
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
                  onClick={() => checkIsSolved(problem.problemNum)}
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
