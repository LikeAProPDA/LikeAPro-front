import instance from "./baseApi";

export const getProblems = async (count) => {
  const response = await instance.get(`/bojs/recommend?num=${count}`);

  return response.data;
};

export const getIsSolved = async (problemNum) => {
  const response = await instance.post(`/bojs/${problemNum}`);

  return response.data;
};
