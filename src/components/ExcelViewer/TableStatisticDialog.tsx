import CloseIcon from "@mui/icons-material/Close";
import { colors, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "tss-react/mui";
import axiosClient from "../../apis/axiosClient";
import { ControlledDatePicker } from "../Form/ControlledDatePicker";
import { IFormData } from "../Form/types";

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
  const [dataRows, setDataRow]   = useState<{_id: String, name: String, count: Number, createdAt: Date }[]>([]);

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = async (date: any) => {
    setSelectedDate(date);
    console.log('Selected date:', dayjs(date).format("YYYY-MM-DD"));
  };


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
      console.log('selectedDateaaa', selectedDate);
      const response = await axiosClient.get(
        `/devices/getAll/${dayjs(selectedDate).format("YYYY-MM-DD")}`
        // `/devices/getAll/2024-10-09`
      );
      console.log(response);
      setDataRow(response.data);
    }
    fetchData()
  }, [selectedDate]);

  // const dataRows = getAllData();
  const sheetRows = dataRows.map((row: { createdAt: Date }) => ({...row, createdAt: formatDate(row.createdAt)}));
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Typography variant="h6"> Thống kê</Typography>
        <DatePicker
          label="Chọn ngày"
          value={selectedDate}
          onChange={handleDateChange} // Log date on selection
        />
        <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
      </LocalizationProvider>
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
