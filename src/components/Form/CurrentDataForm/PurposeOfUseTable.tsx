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
import { cloneDeep } from "lodash";
import { useMemo, useState } from "react";
import {
  Control,
  UseFormRegister,
  UseFormResetField,
  UseFormWatch,
} from "react-hook-form";
import { LOAI_DAT } from "../../../utils/formFields";
import ControlledNumberField from "../ControlledNumberField";
import { ControlledSelect } from "../ControlledSelect";
import { ControlledTextField } from "../ControlledTextField";
import { IFormData } from "../types";
import { makeStyles } from "tss-react/mui";

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

export const PurposeOfUseTable = ({
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
    landType: "loaiDat1",
    area: "dienTichMDSD1",
  });

  const handleNextField = () => {
    setCurrentFields({
      landType: "loaiDat2",
      area: "dienTichMDSD2",
    });
  };

  const handlePreviousField = () => {
    setCurrentFields({
      landType: "loaiDat1",
      area: "dienTichMDSD1",
    });
  };

  const handleAddRow = () => {
    if (numRows >= ROWS.length) {
      return;
    }
    setNumRows((prev) => prev + 1);
  };

  const handleRemoveRow = () => {
    resetField(`loaiDat${numRows}`, { defaultValue: "" });
    resetField(`dienTichMDSD${numRows}`, { defaultValue: 0 });

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
        landType: "loaiDat1",
        area: "dienTichMDSD1",
      },
      {
        landType: "loaiDat2",
        area: "dienTichMDSD2",
      },
    ];
    rows.splice(0, numRows).forEach((row, index) => {
      const [landType, area] = [form[row.landType], form[row.area]];
      if (!landType && !area) {
        data.push({
          landType: `Chọn loại đất ${index + 1}`,
          area: `Chọn diện tích ${index + 1}`,
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
            <Tooltip title="Thêm mục đích sử dụng">
              <IconButton
                color="primary"
                onClick={handleAddRow}
                disabled={numRows >= ROWS.length}
                className={classes.rowButton}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa mục đích sử dụng">
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
            <Tooltip title="Mục đích sử dụng 1">
              <IconButton
                className={classes.rowButton}
                onClick={handlePreviousField}
                disabled={currentFields.landType === "loaiDat1"}
              >
                <KeyboardArrowLeftIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Mục đích sử dụng 2">
              <IconButton
                className={classes.rowButton}
                onClick={handleNextField}
                disabled={
                  currentFields.landType === "loaiDat2" || numRows === 1
                }
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Grid2>
      {currentFields.landType === "loaiDat1" && numRows > 0 && (
        <Grid2 size={3} spacing={1} container>
          <Grid2 size={12}>
            <ControlledSelect
              control={control}
              label="Loại đất 1"
              {...register("loaiDat1")}
              options={Object.entries(LOAI_DAT).map(([key, value]) => ({
                label: `${value} (${key})`,
                value: key,
              }))}
            />
          </Grid2>
          <Grid2 size={12}>
            <ControlledNumberField
              control={control}
              label="Diện tích 1"
              size="small"
              name={"dienTichMDSD1"}
              register={register}
            />
          </Grid2>
          <Grid2 size={12}>
            <ControlledTextField
              control={control}
              name="thoiHanSuDung1"
              label="Thời hạn 1"
            />
          </Grid2>

          <Grid2 size={12}>
            <ControlledTextField
              control={control}
              name="nguonGocSuDung1"
              label="Nguồn gốc 1"
              size="small"
            />
          </Grid2>
        </Grid2>
      )}
      {currentFields.landType === "loaiDat2" && numRows > 1 && (
        <Grid2 size={3} spacing={1} container>
          <Grid2 size={12}>
            <ControlledSelect
              control={control}
              label="Loại đất 2"
              {...register("loaiDat2")}
              options={Object.entries(LOAI_DAT).map(([key, value]) => ({
                label: `${value} (${key})`,
                value: key,
              }))}
            />
          </Grid2>
          <Grid2 size={12}>
            <ControlledNumberField
              control={control}
              label="Diện tích 2"
              size="small"
              name={"dienTichMDSD2"}
              register={register}
            />
          </Grid2>
          <Grid2 size={12}>
            <ControlledTextField
              control={control}
              name="thoiHanSuDung2"
              label="Thời hạn 2"
            />
          </Grid2>

          <Grid2 size={12}>
            <ControlledTextField
              control={control}
              name="nguonGocSuDung2"
              label="Nguồn gốc 2"
              size="small"
            />
          </Grid2>
        </Grid2>
      )}
    </Grid2>
  );
};
