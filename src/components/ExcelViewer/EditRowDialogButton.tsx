import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  CircularProgress,
  colors,
  Divider,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { AxiosError } from "axios";
import { useLayoutEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { makeStyles } from "tss-react/mui";
import { editRow } from "../../apis/excel";
import { SheetRowData } from "../../utils/types";

const useStyles = makeStyles()(() => ({
  exitButton: {
    height: 40,
    backgroundColor: colors.grey["100"],
    color: colors.grey["900"],
  },
  updateButton: {
    height: 40,
    backgroundColor: colors.grey["900"],
    color: colors.grey["100"],
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  editRowButton: {
    height: 40,
    backgroundColor: colors.grey["900"],
  },
}));
interface Props {
  fileId: string;
  sheetName: string;
  rowIndex: number;
  sheetHeaders: string[];
  selectedRowData: SheetRowData;
  refetch: () => void;
}
interface FormData {
  [k: string]: string;
}

export const EditRowDialogButton = ({
  fileId,
  sheetName,
  rowIndex,
  sheetHeaders,
  selectedRowData,
  refetch,
}: Props) => {
  const { classes } = useStyles();
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: selectedRowData,
  });

  const [editingRow, setEditingRow] = useState(false);
  const [loadingFormFields, setLoadingFormFields] = useState(true);

  useLayoutEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (editingRow) {
      setLoadingFormFields(true);
      timeoutId = setTimeout(() => {
        reset(selectedRowData); // Ensure form resets with the latest data
        setLoadingFormFields(false); // Render form fields after delay
      }, 300); // Small delay for smoother loading
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [editingRow, selectedRowData, reset]);

  const onClose = () => {
    setEditingRow(false);
  };
  const onSubmit = async (data: FormData) => {
    try {
      await editRow({
        fileId,
        sheetName,
        rowIndex,
        newRow: data,
      });
      toast.success("Cập nhật hàng thành công");
      refetch();
      onClose();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      } else {
        console.error(error);
      }
    }
  };

  // Memoize the form fields so that they do not re-render unnecessarily
  const MemoizedFormFields = useMemo(() => {
    return sheetHeaders
      .filter((value) => value !== "tamY") // Exclude tamY field
      .map((value, key) => (
        <Grid2 key={key} size={4}>
          <Controller
            name={value}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                label={value}
                type="text"
                fullWidth
              />
            )}
          />
        </Grid2>
      ));
  }, [sheetHeaders, control]);

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setEditingRow(true)}
        className={classes.editRowButton}
        startIcon={<EditOutlinedIcon />}
      >
        Sửa hàng
      </Button>
      {editingRow && (
        <Dialog
          fullScreen
          open
          onClose={onClose}
          PaperProps={{
            component: "form",
            onSubmit: handleSubmit(onSubmit),
          }}
        >
          <DialogTitle className={classes.title}>
            <Typography variant="h6"> Sửa hàng</Typography>
            <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Grid2 container columnSpacing={2} width="100%" height="100vh">
              {loadingFormFields ? (
                <Stack
                  spacing={2}
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                  width="100%"
                  zIndex={999}
                >
                  <CircularProgress size="3rem" />
                </Stack>
              ) : (
                <Grid2 container columnSpacing={2}>
                  {MemoizedFormFields}
                </Grid2>
              )}
            </Grid2>
          </DialogContent>
          <Divider />
          <DialogActions
            sx={{
              p: 2,
            }}
          >
            <Button
              onClick={onClose}
              size="small"
              className={classes.exitButton}
            >
              Thoát
            </Button>
            <Button size="small" type="submit" className={classes.updateButton}>
              Cập nhật
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
