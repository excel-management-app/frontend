import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  colors,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid2,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { SheetRowData } from "../../../utils/types";
import { useSheetContext } from "../../ExcelViewer/contexts/SheetContext";
import { makeStyles } from "tss-react/mui";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { UseFormReset } from "react-hook-form";
import { IFormData } from "../types";
import { convertToFormData } from "../functions";

const useStyles = makeStyles()(() => ({
  exitButton: {
    height: 40,
    backgroundColor: colors.grey["100"],
    color: colors.grey["900"],
  },
  addButton: {
    height: 40,
    backgroundColor: colors.grey["900"],
    color: colors.grey["100"],
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const HEADERS_NAME = ["hoTen", "namSinh", "loaiGiayTo", "soGiayTo", "ngayCap"];

interface Props {
  reset: UseFormReset<IFormData>;
}

export const SearchDialog = ({ reset }: Props) => {
  const { classes } = useStyles();
  const { rows } = useSheetContext();

  const [openSearch, setOpenSearch] = useState(false);
  const [value, setValue] = useState({
    hoTen: "",
    namSinh: "",
  });

  const [rowsData, setRowsData] = useState<SheetRowData[]>([]);
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  const onClose = () => {
    setOpenSearch(false);
    setValue({
      hoTen: "",
      namSinh: "",
    });
  };

  const filterRows = () => {
    const hoten = value.hoTen.toLowerCase();
    const namSinh = value.namSinh;
    if (!hoten && !namSinh) {
      toast.error("Vui lòng nhập từ khóa để tìm kiếm");
      return;
    }
    const filteredRows = rows.filter((row) => {
      if (namSinh) {
        return (
          String(row.hoTen).toLowerCase().includes(hoten) &&
          String(row.namSinh) === namSinh
        );
      } else {
        return String(row.hoTen).toLowerCase().includes(hoten);
      }
    });

    if (!filteredRows.length) {
      toast.error("Không tìm được kết quả");
    }

    setRowsData(filteredRows);
  };
  const getRowId = (row: SheetRowData) => rows.indexOf(row);

  const handleFillForm = () => {
    try {
      if (!rowSelectionModel.length) {
        toast.error("Vui lòng chọn dòng để điền");
        return;
      }
      const formData = rows[rowSelectionModel[0] as number];

      reset(
        convertToFormData({
          data: {
            ...formData,
            soHieuToBanDo: "",
            soThuTuThua: "",
          },
        }),
      );
      onClose();
    } catch (error) {
      toast.error("Có lỗi xảy ra, xin vui lòng thử lại");
    }
  };

  return (
    <>
      <Button
        size="small"
        variant="text"
        onClick={() => {
          setOpenSearch(true);
        }}
        startIcon={<SearchIcon />}
      >
        Tìm kiếm thông tin chủ
      </Button>
      {openSearch && (
        <Dialog open onClose={onClose} fullWidth maxWidth="lg">
          <DialogTitle className={classes.title}>
            <Typography
              variant="body1"
              fontWeight="bold"
              fontSize={18}
              textTransform="uppercase"
            >
              Tìm kiếm
            </Typography>
            <IconButton sx={{ cursor: "pointer" }} onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              maxHeight: "50vh",
            }}
          >
            <Grid2 container size={12}>
              <Grid2 size={4}>
                <FormControl fullWidth margin="normal">
                  <Grid2 size={10} alignItems="flex-start">
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Họ và tên"
                      size="small"
                      value={value.hoTen}
                      onChange={(e) =>
                        setValue({ ...value, hoTen: e.target.value })
                      }
                    />
                  </Grid2>
                  <Grid2 size={4}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Năm sinh"
                      size="small"
                      type="number"
                      value={value.namSinh}
                      onChange={(e) =>
                        setValue({
                          ...value,
                          namSinh: String(e.target.value),
                        })
                      }
                    />
                  </Grid2>
                  <Grid2 container size={12} mt={2} gap={1}>
                    <Grid2 size={5}>
                      <Button variant="contained" onClick={() => filterRows()}>
                        Tìm kiếm
                      </Button>
                    </Grid2>
                    <Grid2 size={5}>
                      <Button
                        variant="contained"
                        onClick={() => handleFillForm()}
                      >
                        Nhập vào form
                      </Button>
                    </Grid2>
                  </Grid2>
                </FormControl>
              </Grid2>

              <Grid2 size={8} maxHeight={"50vh"}>
                <DataGrid
                  checkboxSelection
                  onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                  }}
                  rowSelectionModel={rowSelectionModel}
                  rowHeight={30}
                  getRowId={getRowId}
                  rows={rowsData}
                  columns={HEADERS_NAME.map((header) => ({
                    field: header,
                    headerName: header,
                    flex: 1,
                  }))}
                  localeText={{
                    noRowsLabel: "Không có dữ liệu",
                  }}
                />
              </Grid2>
            </Grid2>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button variant="contained" onClick={onClose}>
              Thoát
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
