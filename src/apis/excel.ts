import axiosClient from "./axiosClient";
import { FileData } from "./types";

interface Props {
  fileId: string;
}
// files/:fileId
export const getFileData = async ({ fileId }: Props): Promise<FileData> => {
  const response = await axiosClient.get(`/files/${fileId}`);
  return response.data;
};

export const getAllFiles = async (): Promise<FileData[]> => {
  const response = await axiosClient.get("/files");
  return response.data;
};
