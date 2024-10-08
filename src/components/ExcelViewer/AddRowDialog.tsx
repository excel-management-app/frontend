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
import { Controller, useForm } from "react-hook-form";
import { makeStyles } from "tss-react/mui";
import { addRowToSheet } from "../../apis/excel";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useLayoutEffect, useMemo, useState } from "react";

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

interface FormData {
  [k: string]: string;
}

interface AddRowDialogProps {
  onClose: () => void;
  fieldNames: string[];
  fileId: string;
  sheetName: string;
  refetch: () => void;
}

export default function AddRowDialog({
  onClose,
  fieldNames,
  fileId,
  sheetName,
  refetch,
}: AddRowDialogProps) {
  const { classes } = useStyles();

  const { control, handleSubmit, reset } = useForm();

  const onSubmit = async (data: FormData) => {
    try {
      await addRowToSheet({
        fileId,
        sheetName,
        newRow: data,
      });

      toast.success("Thêm hàng thành công");
      refetch();
      reset();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      } else {
        console.error(error);
      }
    }
  };
  const [loadingFormFields, setLoadingFormFields] = useState(true);
  useLayoutEffect(() => {
    setLoadingFormFields(true);
    const timeoutId = setTimeout(() => {
      setLoadingFormFields(false); // Render form fields after delay
    }, 300); // Small delay for smoother loading

    return () => {
      clearTimeout(timeoutId);
    };
  }, [reset]);

  // Memoize the form fields so that they do not re-render unnecessarily
  const MemoizedFormFields = useMemo(() => {
    return fieldNames
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
  }, [fieldNames, control]);
  console.log(fieldNames.filter((value) => value !== "tamY"));

  return (
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
        <Typography variant="h6">Thêm hàng</Typography>
        <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
      </DialogTitle>
      <Divider />
      <DialogContent>
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
      </DialogContent>
      <Divider />
      <DialogActions
        sx={{
          p: 2,
        }}
      >
        <Button onClick={onClose} size="small" className={classes.exitButton}>
          Thoát
        </Button>
        <Button size="small" type="submit" className={classes.addButton}>
          Thêm hàng
        </Button>
      </DialogActions>
    </Dialog>
  );
}
