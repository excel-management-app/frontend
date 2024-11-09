import { Box, Theme } from "@mui/material";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { FileListOption, SheetRowData } from "../../utils/types";
import { UserInfo } from "../UserInfo";
import { SheetContextProvider } from "./contexts/SheetContext";
import { EditRowDialogButton } from "./EditRowDialogButton";
import { ExportToWordButton } from "./ExportToWordButton";
import { FileExportButton } from "./FileExportButton";
import { FileListSelect } from "./FileListSelect";
import FileUploadButton from "./FileUploadButton";
import { useGetTableData } from "./hooks/useTableData";
import { SheetNameSelect } from "./SheetNamesSelector";
import { StatisticButton } from "./StatisticButton";
import { TemplateUploadButton } from "./TemplateUploadButton";
// import { UploadMapButton } from "./TemplateMapButton";

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

interface Props {
  files: FileListOption[];
  refetch: () => void;
}

export const ExcelViewer = ({ files, refetch: refetchFilesData }: Props) => {
  const { classes } = useStyles();

  const [selectedFile, setSelectedFile] = useState<FileListOption | null>(
    files[0] || null
  );
  const fileId = useMemo(() => selectedFile?.id || "", [selectedFile]);
  const [selectedSheetName, setSelectedSheetName] = useState(
    selectedFile?.sheetNames[0] || ""
  );

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 50,
    page: 0,
  });

  const { sheetRows, sheetColumns, loading, sheetHeaders, totalRows, refetch } =
    useGetTableData({
      fileId,
      sheetName: selectedSheetName,
      pagination: paginationModel,
    });

  const onSelectFile = (fileId: string) => {
    setSelectedFile(files.find((file) => file.id === fileId) || null);
  };

  const getRowId = (row: SheetRowData) => sheetRows.indexOf(row);

  // return tamY = soHieuToBanDo_soThuTuThua from rowSelectionModel
  const listTamY = useMemo(() => {
    return rowSelectionModel
      .map((index) => {
        const row = sheetRows[index as number];
        return `${row.soHieuToBanDo}_${row.soThuTuThua}`;
      })
      .join(",");
  }, [rowSelectionModel, sheetRows]);

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
                <FileUploadButton onUploadSuccess={refetchFilesData} />
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
                  options={selectedFile.sheetNames}
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
                  refetch={refetch}
                  clearSelection={clearSelection}
                  listTamY={listTamY}
                />
              )}
            {/* {isAdmin && <UploadMapButton isAdmin={isAdmin} />}
            {!isAdmin && <UploadMapButton isAdmin={isAdmin} />} */}
            {rowSelectionModel.length > 1 && (
              <ExportToWordButton disabled={loading} listTamY={listTamY} />
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
            paginationModel={paginationModel}
            onPaginationModelChange={(props) => {
              if (loading) {
                return;
              }
              setPaginationModel(props);
            }}
            pagination
            pageSizeOptions={[50]}
            getRowId={getRowId}
            paginationMode="server"
            rowCount={totalRows}
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
            keepNonExistentRowsSelected
          />
        </Box>
      </Box>
    </SheetContextProvider>
  );
};
