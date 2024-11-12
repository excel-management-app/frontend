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
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import { useCallback, useLayoutEffect, useState } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { makeStyles } from "tss-react/mui";
import { SheetRowData } from "../../../utils/types";
import { useSheetContext } from "../../ExcelViewer/contexts/SheetContext";
import { convertToFormData } from "../functions";
import { IFormData } from "../types";
import { HEADERS_NAME, PERSONAL_INFO_FIELDS } from "./consts";
import { removeVietnameseAccents } from "./functions";
import axiosClient from "../../../apis/axiosClient";
import { useQuery } from "@tanstack/react-query";

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

interface Props {
  watch: UseFormWatch<IFormData>;
  setFormValue: UseFormSetValue<IFormData>;
}

export const SearchDialog = ({ watch, setFormValue }: Props) => {
  const { classes } = useStyles();
  const { sheetName, fileId } = useSheetContext();

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
    setRowSelectionModel([]);
    setRowsData([]);
  };

  const fetchRows = useCallback(async ({ queryKey }: { queryKey: any[] }) => {
    const [_, fileId, sheetName, hoten, namSinh] = queryKey;
    const url = `/files/${fileId}/sheets/${sheetName}/rows?name=${hoten}&date=${namSinh}`;
    const response = await axiosClient.get(url);
    return response.data;
  }, []);

  const { refetch, data, isFetching } = useQuery({
    queryKey: [
      "rowsData",
      fileId,
      sheetName,
      removeVietnameseAccents(value.hoTen.trim().toLowerCase()),
      value.namSinh.trim(),
    ],
    queryFn: fetchRows,
    enabled: false,
    gcTime: 1000 * 60 * 30, // Cache for 30 minutes
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });

  const filterRows = useCallback(() => {
    const hoten = value.hoTen.trim();
    const namSinh = value.namSinh.trim();

    if (!hoten && !namSinh) {
      toast.error("Vui lòng nhập từ khóa để tìm kiếm");
      return;
    }

    refetch();
  }, [value.hoTen, value.namSinh, refetch]);

  useLayoutEffect(() => {
    if (data) {
      setRowsData(data);
    }
  }, [data]);

  const getRowId = (row: SheetRowData) => rowsData.indexOf(row);

  const handleFillForm = () => {
    try {
      if (!rowSelectionModel.length) {
        toast.error("Vui lòng chọn dòng để điền");
        return;
      }
      const formData = rowsData[rowSelectionModel[0] as number];

      const dataObj = PERSONAL_INFO_FIELDS.reduce(
        (acc, field) => {
          acc[field] = formData[field] || "";
          return acc;
        },
        {} as Record<string, any>,
      );

      // Preserve specific fields from the form
      const preservedFields = ["soHieuToBanDo", "soThuTuThua"];
      preservedFields.forEach((field) => {
        dataObj[field] = watch(field);
      });

      // Keep values of fields not in PERSONAL_INFO_FIELDS
      const currentFormValues = watch();
      Object.keys(currentFormValues).forEach((key) => {
        if (!PERSONAL_INFO_FIELDS.includes(key)) {
          dataObj[key] = currentFormValues[key];
        }
      });

      const convertedData = convertToFormData({
        data: dataObj,
      });

      Object.entries(convertedData).forEach(([key, value]) => {
        setFormValue(key, value, {
          shouldDirty: true,
        });
      });
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
                <FormControl fullWidth margin="normal" autoFocus>
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
                      autoFocus
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
                      <Button
                        variant="contained"
                        onClick={() => filterRows()}
                        disabled={isFetching}
                      >
                        {isFetching ? "Đang tìm..." : "Tìm kiếm"}
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
                  disableMultipleRowSelection
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
