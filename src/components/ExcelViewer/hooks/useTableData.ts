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
  if (!sheetName) {
    return {
      sheetRows: [] as SheetRowData[],
      sheetColumns: [],
      sheetHeaders: [],
      loading: false,
      refetch: () => {},
      totalRows: 0,
    };
  }

  const { data, loading, refetch } = useGetFileData({
    fileId,
    sheetName,
    pagination,
  });

  const { rows: sheetRows, headers: sheetHeaders } = useMemo<{
    rows: SheetRowData[];
    headers: string[];
  }>(() => {
    const currentSheet = data?.sheet;
    const headers = currentSheet?.headers || [];
    const rows = currentSheet?.rows || [];

    return {
      rows,
      headers,
    };
  }, [data?.sheet, sheetName]);

  const columns: GridColDef[] = useMemo(
    () =>
      sheetHeaders.map((header) => ({
        field: header,
        headerName: header,
        width: 200,
      })),
    [sheetHeaders],
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
