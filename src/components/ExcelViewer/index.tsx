import { Box, Theme } from "@mui/material";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { FileListOption, SheetRowData } from "../../utils/types";
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
import { UserInfo } from "../UserInfo";
import { useCurrentUser } from "../../hooks/useCurrentUser";

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

  const { sheets, sheetRows, sheetColumns, loading, refetch } = useGetTableData(
    {
      fileId,
      sheetName: selectedSheetName,
    },
  );

  const onSelectFile = (fileId: string) => {
    setSelectedFile(files.find((file) => file.id === fileId) || null);
  };

  const paginationModel = { page: 0, pageSize: 20 };
  const getRowId = (row: SheetRowData) => sheetRows.indexOf(row);

  const [searchKey, setSearchKey] = useState<string>("");

  const selectedRowData = useMemo(() => {
    if (searchKey) {
      return (
        sheetRows.find(
          (row) =>
            searchKey === `${row.soToCu}_${row.soThuaCu}` ||
            searchKey === `${row.soHieuToBanDo}_${row.soThuTuThua}`,
        ) || null
      );
    }
    return rowSelectionModel.length > 0
      ? sheetRows[rowSelectionModel[0] as number]
      : null;
  }, [rowSelectionModel, sheetRows.length, searchKey]);

  const rowIndex = useMemo(
    () => (selectedRowData ? sheetRows.indexOf(selectedRowData) : -1),
    [selectedRowData, sheetRows],
  );

  const listRowIndex = useMemo(
    () =>
      rowSelectionModel.length
        ? rowSelectionModel.join(",")
        : rowIndex >= 0
          ? String(rowIndex)
          : "",
    [rowIndex, sheetRows.length, rowSelectionModel],
  );

  const { isAdmin } = useCurrentUser();
  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.header}>
          <UserInfo />

          <Box sx={{ display: "flex", gap: "10px" }}>
            <FileUploadButton />
            {isAdmin && <TemplateUploadButton />}
            {selectedFile && <FileExportButton fileId={fileId} />}
            <StatisticButton />
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
            {selectedFile && selectedSheetName && (
              <EditRowDialogButton
                fileId={fileId}
                sheetName={selectedSheetName}
                rowIndex={rowIndex}
                refetch={refetch}
                selectedRowData={selectedRowData}
                setSearchKey={setSearchKey}
                listRowIndex={rowIndex >= 0 ? String(rowIndex) : ""}
              />
            )}

            {selectedRowData && (
              <ExportToWordButton
                fileId={fileId}
                sheetName={selectedSheetName}
                listRowIndex={listRowIndex}
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
            // disableMultipleRowSelection
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setRowSelectionModel(newRowSelectionModel);
            }}
            rowSelectionModel={rowSelectionModel}
          />
        </Box>
      </Box>
    </>
  );
};
