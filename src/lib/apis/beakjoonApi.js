import instance from "./baseApi";

export const getProblemsUser = async (count) => {
  const response = await instance.get(`/bojs/recommend?num=${count}`);

  return response.data;
};

export const getProblems = async (count) => {
  const response = await instance.get(`/bojs/recommend/random?num=${count}`);

  return response.data;
};

export const getIsSolved = async (problemNum, problemId) => {
  const response = await instance.post(`/bojs/check`, {
    problemNum,
    problemId,
  });

  return response.data;
};
