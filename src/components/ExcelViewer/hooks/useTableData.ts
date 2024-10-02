import { useMemo } from "react";
import { SheetRowData } from "../../../utils/types";
import { useGetFileData } from "./useGetFileData";
import { GridColDef } from "@mui/x-data-grid";
import { SheetData } from "../../../apis/types";

interface Dependencies {
  fileId: string;
  sheetName: string;
}
export function useGetTableData({ fileId, sheetName }: Dependencies) {
  const { data, loading } = useGetFileData(fileId);
  const {
    sheets,
    rows: sheetRows,
    headers: sheetHeaders,
  } = useMemo<{
    sheets: Pick<SheetData, "sheetName" | "id">[];
    rows: SheetRowData[];
    headers: string[];
  }>(() => {
    const currentSheet = data?.sheets.find(
      (sheet) => sheet.sheetName === sheetName
    );
    const headers = currentSheet?.headers || [];
    const rows = currentSheet?.rows || [];

    return {
      sheets: data?.sheets || [],
      rows,
      headers,
    };
  }, [data?.sheets, sheetName]);

  const columns: GridColDef[] = useMemo(
    () =>
      sheetHeaders.map((header) => ({
        field: header,
        headerName: header,
        width: 200,
      })),
    [sheetHeaders]
  );

  return {
    sheets,
    sheetRows,
    sheetColumns: columns,
    sheetHeaders,
    loading,
  };
}
