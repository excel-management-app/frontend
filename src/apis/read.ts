import axiosClient from "./axiosClient";

interface Props {
  sheetName?: string;
}
interface Result {
  data: string[][];
  sheetNames: string[];
}
export const readFileApi = async ({ sheetName }: Props): Promise<Result> => {
  const response = await axiosClient.get("/read", {
    params: { sheetName },
  });
  return {
    data: response.data.data,
    sheetNames: response.data.sheetNames,
  };
};
