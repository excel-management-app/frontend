import { Box, Theme } from "@mui/material";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { FileListOption, SheetRowData } from "../../utils/types";
import { UserInfo } from "../UserInfo";
import { EditRowDialogButton } from "./EditRowDialogButton";
import { ExportToWordButton } from "./ExportToWordButton";
import { FileExportButton } from "./FileExportButton";
import { FileListSelect } from "./FileListSelect";
import FileUploadButton from "./FileUploadButton";
import { useGetAllFiles } from "./hooks/useGetAllFiles";
import { useGetTableData } from "./hooks/useTableData";
import { SheetNameSelect } from "./SheetNamesSelector";
import { StatisticButton } from "./StatisticButton";
import { TemplateUploadButton } from "./TemplateUploadButton";
import { toast } from "react-toastify";
import { SheetContextProvider } from "./contexts/SheetContext";

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    padding: theme.spacing(0, 2),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    height: "100%",
    overflow: "hidden",
  },
  selectors: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  selector: {
    width: 220,
  },
  paper: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(2, 1),
  },
}));

export const ExcelViewer = () => {
  const { classes } = useStyles();

  const [selectedFile, setSelectedFile] = useState<FileListOption | null>(null);
  const fileId = useMemo(() => selectedFile?.id || "", [selectedFile]);
  const [selectedSheetName, setSelectedSheetName] = useState("");
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  const { files } = useGetAllFiles();

  const { sheets, sheetRows, sheetColumns, loading, sheetHeaders, refetch } =
    useGetTableData({
      fileId,
      sheetName: selectedSheetName,
    });

  const onSelectFile = (fileId: string) => {
    setSelectedFile(files.find((file) => file.id === fileId) || null);
  };

  const paginationModel = { page: 0, pageSize: 20 };
  const getRowId = (row: SheetRowData) => sheetRows.indexOf(row);

  const [searchKey, setSearchKey] = useState<string>("");

  const selectedRowData = useMemo(() => {
    if (searchKey) {
      const searchResult =
        sheetRows.find(
          (row) => searchKey === `${row.soHieuToBanDo}_${row.soThuTuThua}`
        ) || null;
      return searchResult;
    }
    return rowSelectionModel.length > 0
      ? sheetRows[rowSelectionModel[0] as number]
      : null;
  }, [rowSelectionModel, sheetRows.length, searchKey, loading]);

  // return tamY = soHieuToBanDo_soThuTuThua from rowSelectionModel
  const listTamY = useMemo(() => {
    return rowSelectionModel
      .map((index) => {
        const row = sheetRows[index as number];
        return `${row.soHieuToBanDo}_${row.soThuTuThua}`;
      })
      .join(",");
  }, [rowSelectionModel, sheetRows]);

  useEffect(() => {
    if (searchKey && !selectedRowData) {
      toast.error("Không tìm thấy kết quả");
    }
  }, [searchKey, selectedRowData]);

  const rowIndex = useMemo(() => {
    return sheetRows.findIndex(
      (row) =>
        row.soHieuToBanDo === selectedRowData?.soHieuToBanDo &&
        row.soThuTuThua === selectedRowData?.soThuTuThua
    );
  }, [selectedRowData, sheetRows]);

  const listRowIndex = useMemo(
    () =>
      rowSelectionModel.length
        ? rowSelectionModel.join(",")
        : rowIndex >= 0
          ? String(rowIndex)
          : "",
    [rowIndex, sheetRows.length, rowSelectionModel]
  );

  const clearSelection = () => {
    setRowSelectionModel([]);
  };

  const { isAdmin } = useCurrentUser();
  return (
    <SheetContextProvider
      sheetName={selectedSheetName}
      fileId={fileId}
      sheetHeaders={sheetHeaders}
      rows={sheetRows}
    >
      <Box className={classes.root}>
        <Box className={classes.header}>
          <UserInfo />

          <Box sx={{ display: "flex", gap: "10px" }}>
            {isAdmin && (
              <>
                <FileUploadButton />
                <TemplateUploadButton />
                {selectedFile && selectedSheetName && (
                  <FileExportButton
                    fileId={fileId}
                    sheetName={selectedSheetName}
                  />
                )}
                <StatisticButton />
              </>
            )}
          </Box>
        </Box>

        <Box className={classes.header} pl={2} px={1}>
          <Box className={classes.selectors}>
            <Box className={classes.selector}>
              {!!files.length && (
                <FileListSelect
                  options={files}
                  value={selectedFile}
                  onChange={onSelectFile}
                />
              )}
            </Box>

            {selectedFile && (
              <Box className={classes.selector}>
                <SheetNameSelect
                  sheets={sheets}
                  onChange={setSelectedSheetName}
                  value={selectedSheetName}
                />
              </Box>
            )}
          </Box>

          <Box sx={{ display: "flex", gap: "10px" }}>
            {selectedFile &&
              selectedSheetName &&
              rowSelectionModel.length < 2 && (
                <EditRowDialogButton
                  fileId={fileId}
                  sheetName={selectedSheetName}
                  rowIndex={rowIndex}
                  refetch={refetch}
                  selectedRowData={selectedRowData}
                  setSearchKey={setSearchKey}
                  listRowIndex={listRowIndex}
                  clearSelection={clearSelection}
                  title={
                    rowSelectionModel.length
                      ? "Chỉnh sửa đơn đăng ký"
                      : "Thêm mới đơn đăng ký"
                  }
                />
              )}

            {listRowIndex.split(",").length > 1 && (
              <ExportToWordButton
                disabled={!selectedRowData}
                fileId={fileId}
                sheetName={selectedSheetName}
                listTamY={listTamY}
              />
            )}
          </Box>
        </Box>

        <Box sx={{ height: "calc(100vh - 220px)", p: 1 }}>
          <DataGrid
            scrollbarSize={2}
            rowHeight={40}
            loading={loading}
            rows={sheetRows}
            columns={sheetColumns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10, 20]}
            getRowId={getRowId}
            localeText={{
              noRowsLabel: "Không có dữ liệu",
              footerRowSelected(count) {
                return `${count} dòng đã được chọn`;
              },
            }}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setRowSelectionModel(newRowSelectionModel);
            }}
            rowSelectionModel={rowSelectionModel}
          />
        </Box>
      </Box>
    </SheetContextProvider>
  );
};
