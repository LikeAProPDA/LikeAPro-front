import instance from "./baseApi";

export const getSchedule = async () => {
  const response = await instance.get("/schedule");
  console.log(response.data);

  return response.data;
};

export default {
  getSchedule,
};
