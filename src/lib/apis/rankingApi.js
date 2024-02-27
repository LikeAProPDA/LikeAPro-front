import instance from "./baseApi";

export const postScore = async (score) => {
  const response = await instance.post("/score", {
    score: score,
  });

  return response.data;
};

export const getRanking = async (start, limit) => {
  const response = await instance.get(
    `/score/ranking/?start=${start}&limit=${limit}`
  );

  return response.data;
};
