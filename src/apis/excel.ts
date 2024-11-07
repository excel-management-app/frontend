import { FileListOption } from "../utils/types";
import axiosClient from "./axiosClient";
import { FileData } from "./types";

export interface GetFileDataProps {
  fileId: string;
  sheetName: string;
  pagination: Pagination;
}
export interface Pagination {
  page: number;
  pageSize: number;
}
// files/:fileId
export const getFileData = async ({
  fileId,
  sheetName,
  pagination,
}: GetFileDataProps): Promise<FileData> => {
  const response = await axiosClient.get(
    `/files/${fileId}/sheets/${sheetName}?page=${pagination.page}&pageSize=${pagination.pageSize}`
  );
  return response.data;
};

export const getAllFiles = async (): Promise<FileListOption[]> => {
  const response = await axiosClient.get("/files");
  return response.data;
};

interface AddRowProps {
  fileId: string;
  sheetName: string;
  newRow: {
    [k: string]: FormDataEntryValue | number;
  };
}
export const updateOrAddRow = async ({
  fileId,
  sheetName,
  newRow,
}: AddRowProps): Promise<any> => {
  const response = await axiosClient.post(
    `/files/${fileId}/sheets/${sheetName}/rows`,
    {
      data: newRow,
    }
  );

  return response;
};

export const uploadExcelFile = async (formData: FormData): Promise<void> => {
  await axiosClient.post("/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadWordFile = async (formData: FormData): Promise<void> => {
  await axiosClient.post("/files/uploadTemplateWord", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadMapFile = async (formData: FormData): Promise<void> => {
  await axiosClient.post("/files/uploadTemplateMapFile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const countRowsByDeviceId = async ({
  fileId,
  sheetName,
}: {
  fileId: string;
  sheetName: string;
}): Promise<number> => {
  const response = await axiosClient.get(
    `/files/${fileId}/sheets/${sheetName}/count`
  );
  return response.data;
};
