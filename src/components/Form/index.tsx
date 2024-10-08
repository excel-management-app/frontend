import CloseIcon from "@mui/icons-material/Close";
import {
  colors,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import { makeStyles } from "tss-react/mui";
import CurrentDataForm from "./CurrentDataForm";
import OldDataForm from "./OldDataForm";
import { SheetRowData } from "../../utils/types";

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
  onClose: () => void;
  fileId: string;
  sheetName: string;
  refetch: () => void;
  selectedRowData?: SheetRowData;
}

export default function MyForm({
  onClose,
  fileId,
  sheetName,
  selectedRowData,
  refetch,
}: Props) {
  const { classes } = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Dialog open maxWidth="xl" fullScreen>
      <DialogTitle className={classes.title}>
        <Typography variant="h6">Nhập dữ liệu</Typography>
        <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
      </DialogTitle>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Dữ liệu hiện trạng" {...a11yProps(0)} />
          <Tab label="Dữ liệu cũ" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <DialogContent
        sx={{
          overflow: "hidden",
        }}
      >
        <CustomTabPanel value={value} index={0}>
          <CurrentDataForm
            fileId={fileId}
            onClose={onClose}
            refetch={refetch}
            sheetName={sheetName}
            selectedRowData={selectedRowData}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <OldDataForm />
        </CustomTabPanel>
      </DialogContent>
    </Dialog>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
