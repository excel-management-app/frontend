import { GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";
import { GetFileDataProps } from "../../../apis/excel";
import { SheetRowData } from "../../../utils/types";
import { useGetFileData } from "./useGetFileData";
import { useGetAllFileRowsData } from "./useGetAllFileRowsData";

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
      allRows: [] as SheetRowData[],
    };
  }

  const { data, loading, refetch } = useGetFileData({
    fileId,
    sheetName,
    pagination,
  });
  const { data: allFileRowsData } = useGetAllFileRowsData({
    fileId,
    sheetName,
  });

  const {
    rows: sheetRows,
    headers: sheetHeaders,
    allRows,
  } = useMemo<{
    rows: SheetRowData[];
    allRows: SheetRowData[];
    headers: string[];
  }>(() => {
    const currentSheet = data?.sheet;
    const headers = currentSheet?.headers || [];
    const rows = currentSheet?.rows || [];
    const allRows = allFileRowsData || [];

    return {
      rows,
      allRows,
      headers,
    };
  }, [data?.sheet, sheetName, allFileRowsData?.length]);

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
    allRows,
    sheetColumns: columns,
    sheetHeaders,
    loading,
    refetch,
    totalRows: data?.totalRows || 0,
  };
}
