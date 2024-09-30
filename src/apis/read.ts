import axiosClient from "./axiosClient";

export const readFileApi = async () => {
  const response = await axiosClient.get("/read");
  return response.data;
};
