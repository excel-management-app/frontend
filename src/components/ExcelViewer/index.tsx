import { Box, Theme } from "@mui/material";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { FileListOption, SheetRowData } from "../../utils/types";
import { DeviceName } from "../DeviceInfo/DeviceName";
import { AddRowButton } from "./AddRowButton";
import { EditRowDialogButton } from "./EditRowDialogButton";
import { ExportToWordButton } from "./ExportToWordButton";
import { FileExportButton } from "./FileExportButton";
import { FileListSelect } from "./FileListSelect";
import FileUploadButton from "./FileUploadButton";
import { useGetAllFiles } from "./hooks/useGetAllFiles";
import { useGetTableData } from "./hooks/useTableData";
import { SheetNameSelect } from "./SheetNamesSelector";

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
    }
  );

  const onSelectFile = (fileId: string) => {
    setSelectedFile(files.find((file) => file.id === fileId) || null);
  };

  const paginationModel = { page: 0, pageSize: 20 };
  const getRowId = (row: SheetRowData) => sheetRows.indexOf(row);

  const selectedRowData = useMemo(() => {
    if (rowSelectionModel.length === 0) {
      return null;
    }
    return sheetRows[rowSelectionModel[0] as number];
  }, [rowSelectionModel, sheetRows]);

  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.header}>
          <DeviceName />

          <Box sx={{ display: "flex", gap: "10px" }}>
            <FileUploadButton />

            {selectedFile && <FileExportButton fileId={fileId} />}
          </Box>
        </Box>

        <Box className={classes.header} pl={2} px={1}>
          <Box className={classes.selectors}>
            <Box className={classes.selector}>
              <FileListSelect
                options={files}
                value={selectedFile}
                onChange={onSelectFile}
              />
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
            {!!sheetRows.length && !selectedRowData && (
              <AddRowButton
                fileId={fileId}
                selectedSheetName={selectedSheetName}
                refetch={refetch}
              />
            )}
            {selectedRowData && (
              <>
                <EditRowDialogButton
                  fileId={fileId}
                  sheetName={selectedSheetName}
                  rowIndex={rowSelectionModel[0] as number}
                  refetch={refetch}
                  selectedRowData={selectedRowData}
                />
                <ExportToWordButton
                  fileId={fileId}
                  sheetName={selectedSheetName}
                  rowIndex={rowSelectionModel[0] as number}
                />
              </>
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
            disableMultipleRowSelection
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
