import { Box, Button, Theme } from "@mui/material";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { FileListOption, SheetRowData } from "../../utils/types";
import AddRowDialog from "./AddRowDialog";
import { FileListSelect } from "./FileListSelect";
import FileUploadButton from "./FileUploadButton";
import { useGetAllFiles } from "./hooks/useGetAllFiles";
import { useGetTableData } from "./hooks/useTableData";
import { SheetNameSelect } from "./SheetNamesSelector";
import { FileExportButton } from "./FileExportButton";

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    padding: theme.spacing(6, 4),
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
    minWidth: "220px",
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
  },
}));

export const ExcelViewer = () => {
  const { classes } = useStyles();

  const [selectedFile, setSelectedFile] = useState<FileListOption | null>(null);
  const fileId = useMemo(() => selectedFile?.id || "", [selectedFile]);
  const [selectedSheetName, setSelectedSheetName] = useState("");
  const [addingRow, setAddingRow] = useState(false);

  const { files } = useGetAllFiles();

  const { sheets, sheetRows, sheetColumns, loading, sheetHeaders, refetch } =
    useGetTableData({
      fileId,
      sheetName: selectedSheetName,
    });

  const onSelectFile = (fileId: string) => {
    setSelectedFile(files.find((file) => file.id === fileId) || null);
  };

  const paginationModel = { page: 0, pageSize: 10 };
  const getRowId = (row: SheetRowData) => sheetRows.indexOf(row);

  const onOpenAddRowDialog = () => {
    setAddingRow(true);
  };

  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.header}>
          <h1>Excel Viewer</h1>

          <Box sx={{ display: "flex", gap: "10px" }}>
            <FileUploadButton />

            {selectedFile && <FileExportButton />}
          </Box>
        </Box>

        <Paper className={classes.paper} elevation={4}>
          <Box className={classes.header} pl={2}>
            <Box>
              {!!sheetRows.length && (
                <Button variant="contained" onClick={onOpenAddRowDialog}>
                  Thêm hàng
                </Button>
              )}
            </Box>
            <Box className={classes.selectors}>
              <Box className={classes.selector}>
                <FileListSelect
                  options={files}
                  value={selectedFile}
                  onChange={onSelectFile}
                />
              </Box>

              <Box className={classes.selector}>
                <SheetNameSelect
                  sheets={sheets}
                  onChange={setSelectedSheetName}
                  value={selectedSheetName}
                />
              </Box>
            </Box>
          </Box>

          <DataGrid
            scrollbarSize={2}
            loading={loading}
            rows={sheetRows}
            columns={sheetColumns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            getRowId={getRowId}
            sx={{ border: 0, mt: 2, height: "70%", px: 1 }}
          />
        </Paper>
      </Box>
      {addingRow && (
        <AddRowDialog
          onClose={() => setAddingRow(false)}
          fieldNames={sheetHeaders}
          fileId={fileId}
          sheetName={selectedSheetName}
          refetch={refetch}
        />
      )}
    </>
  );
};
