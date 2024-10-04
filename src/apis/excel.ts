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

interface AddRowProps {
  fileId: string;
  sheetName: string;
  newRow: {
    [k: string]: FormDataEntryValue;
  };
}
export const addRowToSheet = async ({
  fileId,
  sheetName,
  newRow,
}: AddRowProps): Promise<FileData> => {
  const response = await axiosClient.post(
    `/files/${fileId}/sheets/${sheetName}/rows`,
    {
      data: newRow,
    }
  );
  return response.data;
};

export const uploadExcelFile = async (formData: FormData): Promise<void> => {
  await axiosClient.post("/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const exportFile = async (fileId: string) => {
  return await axiosClient.get(`/files/${fileId}/export`);
};
