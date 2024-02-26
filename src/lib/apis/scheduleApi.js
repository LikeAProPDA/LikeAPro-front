import instance from "./baseApi";

export const getSchedule = async () => {
  const response = await instance.get("/schedule");
  return response.data;
};

export default {
  getSchedule,
};
