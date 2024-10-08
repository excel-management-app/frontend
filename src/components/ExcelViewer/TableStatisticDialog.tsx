import { colors, Divider, Grid2, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import { makeStyles } from "tss-react/mui";
import { addRowToSheet } from "../../apis/excel";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { DataGrid } from "@mui/x-data-grid";
import axiosClient from "../../apis/axiosClient";
import { useEffect, useState } from "react";

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

interface StatisticProps{
  onClose: () => void
}

export default function TableStatisticDialog({
  onClose
}: StatisticProps) {
  const { classes } = useStyles();
  const [dataRows, setDataRow]   = useState();
  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear(); 

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }

  useEffect(() => {
    async function fetchData() {
      const response = await axiosClient.get(
        `/devices/getAll`
      );
      console.log(response);
      setDataRow(response.data);
    }
    fetchData()
  }, []);

  // const dataRows = getAllData();
  const sheetRows = dataRows.map((row: { createdAt: Date; }) => ({...row, createdAt: formatDate(row.createdAt)}));
  const sheetColumns = [
    { field: 'createdAt', headerName: 'Ngày', width: 150 },
    { field: 'name', headerName: 'Tên thiết bị', width: 150 },
    { field: 'count', headerName: 'Số bản đã xuất file', width: 200 },
  ];
  return (
    <Dialog
      fullScreen
      open
      onClose={onClose}
    >
      <DialogTitle className={classes.title}>
        <Typography variant="h6"> Thống kê</Typography>
        <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
      </DialogTitle>
      <DataGrid
            scrollbarSize={2}
            getRowId={row => row._id}
            rowHeight={40}
            rows={sheetRows}
            columns={sheetColumns}
            localeText={{
              noRowsLabel: "Không có dữ liệu",
              // footerRowSelected(count) {
              //   return `${count} dòng đã được chọn`;
              // },
            }}
          />
    </Dialog>
  );
}
