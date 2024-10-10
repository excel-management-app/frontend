import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  colors,
  Grid2,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { useMemo, useState } from "react";
import {
  Control,
  UseFormRegister,
  UseFormResetField,
  UseFormWatch,
} from "react-hook-form";
import { makeStyles } from "tss-react/mui";
import { LOAI_DAT } from "../../../utils/formFields";
import ControlledNumberField from "../ControlledNumberField";
import { ControlledSelect } from "../ControlledSelect";
import { ControlledTextField } from "../ControlledTextField";
import { IFormData } from "../types";

const useStyles = makeStyles()(() => ({
  rowButton: {
    borderRadius: 10,
    border: `1px solid ${colors.grey["200"]}`,
    marginRight: 10,
  },
}));
interface Row {
  landType: string;
  area: string;
}

const ROWS = [
  {
    landType: "loaiDat1",
    area: "dienTichMDSD1",
  },
  {
    landType: "loaiDat2",
    area: "dienTichMDSD2",
  },
];

export const OldPurposeOfUseTable = ({
  watch,
  control,
  register,
  resetField,
}: {
  control: Control<IFormData, any>;
  register: UseFormRegister<IFormData>;
  watch: UseFormWatch<IFormData>;
  resetField: UseFormResetField<IFormData>;
}) => {
  const { classes } = useStyles();

  const [numRows, setNumRows] = useState(2);
  const [currentFields, setCurrentFields] = useState({
    landType: "loaiDatCu1",
    area: "dtmdsdcu1",
  });

  const handleNextField = () => {
    setCurrentFields({
      landType: "loaiDatCu2",
      area: "dtmdsdcu2",
    });
  };

  const handlePreviousField = () => {
    setCurrentFields({
      landType: "loaiDatCu1",
      area: "dtmdsdcu1",
    });
  };

  const handleAddRow = () => {
    if (numRows >= ROWS.length) {
      return;
    }
    setNumRows((prev) => prev + 1);
  };

  const handleRemoveRow = () => {
    resetField(`loaiDatCu${numRows}`, { defaultValue: "" });
    resetField(`dtmdsdcu${numRows}`, { defaultValue: 0 });

    if (numRows < 1) {
      return;
    }
    setNumRows((prev) => prev - 1);
  };

  const form = watch();

  const formData = useMemo<Row[]>(() => {
    const data: Row[] = [];
    const rows = [
      {
        landType: "loaiDatCu1",
        area: "dtmdsdcu1",
      },
      {
        landType: "loaiDatCu2",
        area: "dtmdsdcu2",
      },
    ];
    rows.splice(0, numRows).forEach((row, index) => {
      const [landType, area] = [form[row.landType], form[row.area]];
      if (!landType && !area) {
        data.push({
          landType: `Chọn loại đất cũ ${index + 1}`,
          area: `Chọn diện tích cũ ${index + 1}`,
        });
      }
      data.push({
        landType: landType ? String(landType) : "",
        area: area ? String(area) : "",
      });
    });
    return data;
  }, [form, numRows]);

  return (
    <Grid2 container size={12} spacing={2}>
      <Grid2 size={3}>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="land usage table">
            <TableHead>
              <TableRow>
                <TableCell>Loại đất</TableCell>
                <TableCell>Diện tích</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.map((row) => (
                <TableRow key={row.area}>
                  <TableCell>{row.landType}</TableCell>
                  <TableCell>{row.area}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Box>
            <Tooltip title="Thêm mục đích sử dụng cũ">
              <IconButton
                color="primary"
                onClick={handleAddRow}
                disabled={numRows >= ROWS.length}
                className={classes.rowButton}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa mục đích sử dụng cũ">
              <IconButton
                className={classes.rowButton}
                color="secondary"
                onClick={handleRemoveRow}
                disabled={numRows <= 0}
              >
                <RemoveIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ ml: 2 }}>
            <Tooltip title="Mục đích sử dụng cũ 1">
              <IconButton
                className={classes.rowButton}
                onClick={handlePreviousField}
                disabled={currentFields.landType === "loaiDatCu1"}
              >
                <KeyboardArrowLeftIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Mục đích sử dụng cũ 2">
              <IconButton
                className={classes.rowButton}
                onClick={handleNextField}
                disabled={
                  currentFields.landType === "loaiDatCu2" || numRows === 1
                }
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Grid2>
      {currentFields.landType === "loaiDatCu1" && numRows > 0 && (
        <Grid2 size={3} spacing={1} container>
          <Grid2 size={12}>
            <ControlledSelect
              control={control}
              label="Loại đất cũ 1"
              {...register("loaiDatCu1")}
              options={Object.entries(LOAI_DAT).map(([key, value]) => ({
                label: `${value} (${key})`,
                value: key,
              }))}
            />
          </Grid2>
          <Grid2 size={12}>
            <ControlledNumberField
              control={control}
              label="Diện tích cũ 1"
              size="small"
              name={"dtmdsdcu1"}
              register={register}
            />
          </Grid2>
          <Grid2 size={12}>
            <ControlledTextField
              control={control}
              name="thmdsdcu1"
              label="Thời hạn cũ 1"
            />
          </Grid2>

          <Grid2 size={12}>
            <ControlledTextField
              control={control}
              name="ngmdsdcu1"
              label="Nguồn gốc cũ 1"
              size="small"
            />
          </Grid2>
        </Grid2>
      )}
      {currentFields.landType === "loaiDatCu2" && numRows > 1 && (
        <Grid2 size={3} spacing={1} container>
          <Grid2 size={12}>
            <ControlledSelect
              control={control}
              label="Loại đất cũ 2"
              {...register("loaiDatCu2")}
              options={Object.entries(LOAI_DAT).map(([key, value]) => ({
                label: `${value} (${key})`,
                value: key,
              }))}
            />
          </Grid2>
          <Grid2 size={12}>
            <ControlledNumberField
              control={control}
              label="Diện tích cũ 2"
              size="small"
              name={"dtmdsdcu2"}
              register={register}
            />
          </Grid2>
          <Grid2 size={12}>
            <ControlledTextField
              control={control}
              name="thmdsdcu2"
              label="Thời hạn cũ 2"
            />
          </Grid2>

          <Grid2 size={12}>
            <ControlledTextField
              control={control}
              name="ngmdsdcu2"
              label="Nguồn gốc cũ 2"
              size="small"
            />
          </Grid2>
        </Grid2>
      )}
    </Grid2>
  );
};
