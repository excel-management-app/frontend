import { Box, Button, Theme } from "@mui/material";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { FileListOption, SheetRowData } from "../../utils/types";
import { useGetTableData } from "./hooks/useTableData";
import { SheetNameSelect } from "./SheetNamesSelector";
import { useGetAllFiles } from "./hooks/useGetAllFiles";
import { FileListSelect } from "./FileListSelect";
import AddRowDialog from "./AddRowDialog";

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    padding: theme.spacing(6, 4),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    height: "100%",
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

  const paginationModel = { page: 0, pageSize: 20 };
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
            <Button variant="contained">Tải file mới</Button>
            <Button variant="contained">Xuất file</Button>
          </Box>
        </Box>

        <Paper className={classes.paper} elevation={4}>
          <Box className={classes.header} pl={2}>
            <Box sx={{ display: "flex" }}>
              <Button variant="contained" onClick={onOpenAddRowDialog}>
                Thêm hàng
              </Button>
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
            loading={loading}
            rows={sheetRows}
            columns={sheetColumns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 20]}
            checkboxSelection
            getRowId={getRowId}
            sx={{ border: 0, mt: 2 }}
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
