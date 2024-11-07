import { GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";
import { GetFileDataProps } from "../../../apis/excel";
import { SheetRowData } from "../../../utils/types";
import { useGetFileData } from "./useGetFileData";

export function useGetTableData({
  fileId,
  sheetName,
  pagination,
}: GetFileDataProps) {
  const { data, loading, refetch } = useGetFileData({
    fileId,
    sheetName,
    pagination,
  });

  const { rows: sheetRows, headers: sheetHeaders } = useMemo<{
    rows: SheetRowData[];
    headers: string[];
  }>(() => {
    const currentSheet = data?.sheets.find(
      (sheet) => sheet.sheetName === sheetName
    );
    const headers = currentSheet?.headers || [];
    const rows = currentSheet?.rows || [];

    return {
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
    sheetRows,
    sheetColumns: columns,
    sheetHeaders,
    loading,
    refetch,
    totalRows: data?.totalRows || 0,
  };
}
