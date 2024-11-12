import { SheetRowData } from "../utils/types";

export interface FileData {
  id: string;
  fileName: string;
  uploadedAt: string;
  sheet: SheetData;
  totalRows: number;
}

export interface SheetData {
  id: string;
  sheetName: string;
  headers: string[];
  rows: SheetRowData[];
}
