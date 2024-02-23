import instance from "./baseApi";

export const getQAboard = async () => {
  const response = await instance.get("/qas");

  return response;
};

export const getaQA = async (qaId) => {
  const response = await instance.get(`/qas/${qaId}`);

  return response.data;
};

export const postQA = async (title, content, author, isCompleted) => {
  const response = await instance.post("/qas", {
    title,
    content,
    author,
    isCompleted,
  });
  return response.data;
};

export const deleteQA = async (qaId) => {
  const response = await instance.delete(`/qas/${qaId}`);
  return response.data;
};

export const editQA = async (qaId, newData) => {
  const response = await instance.put(`/qas/${qaId}`, newData);
  return response.data;
};

export default {
  getQAboard,
  getaQA,
  postQA,
  deleteQA,
  editQA,
};
