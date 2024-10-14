import { FileData } from "../apis/types";

export type FileListOption = Pick<FileData, "id" | "fileName">;

export type SheetRowData = Record<string, string>;

export interface CurrentUser {
  _id: string;
  name: string;
  role: "admin" | "user";
}

export const isAdmin = (currentUser: CurrentUser) => {
  return currentUser.role === "admin";
};

export const isUser = (currentUser: CurrentUser) => {
  return currentUser.role === "user";
};
