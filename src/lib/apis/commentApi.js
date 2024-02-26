import instance from "./baseApi";

export const getCommentsForQA = async (qaId) => {
  const { data } = await instance.get(`/qas/${qaId}/comments`);
  return data;
};

export const uploadCommentForQA = async (qaId, content) => {
  const response = await instance.post(`/qas/${qaId}/comments`, { content });
  return response.data;
};

export const updateCommentForQA = async (commentId, content) => {
  const response = await instance.put(`/qas/comments/${commentId}`, {
    content,
  });
  return response.data;
};

export const deleteCommentForQA = async (commentId) => {
  const response = await instance.delete(`/qas/comments/${commentId}`);
  return response.data;
};

export default {
  getCommentsForQA,
  uploadCommentForQA,
  updateCommentForQA,
  deleteCommentForQA,
};
