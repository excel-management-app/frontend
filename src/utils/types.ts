import { FileData } from "../apis/types";

export type FileListOption = Pick<FileData, "id" | "fileName">;

export type SheetRowData = Record<string, string>;
