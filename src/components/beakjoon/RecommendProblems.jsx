import { useState, useEffect } from "react";
import { getProblems, getIsSolved } from "../../lib/apis/beakjoonApi";
import { v4 as uuidv4 } from "uuid";

const RecommendProblems = () => {
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
        <div key={uuidv4} onClick={() => checkIsSolved(problem.problemNum)}>
          {problem.tags.map((tag) => (
            <span key={uuidv4}>{tag}</span>
          ))}
          <div>{problem.level}</div>
          <div>{problem.algoName}</div>
          <div>{`${problem.solved}`}</div>
        </div>
      ))}
    </>
  );
};

export default RecommendProblems;
