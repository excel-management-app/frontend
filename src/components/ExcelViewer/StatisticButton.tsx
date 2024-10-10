import { Button, colors } from "@mui/material";
import { useState } from "react";
import { makeStyles } from "tss-react/mui";
import TableStatisticDialog from "./TableStatisticDialog";
import AddIcon from "@mui/icons-material/Add";

const useStyles = makeStyles()(() => ({
  addRowButton: {
    height: 40,
    backgroundColor: colors.grey["900"],
  },
}));

export const StatisticButton = () => {
  const { classes } = useStyles();
  const [showTable, setShowTable] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setShowTable(true)}>
        Xem thống kê
      </Button>
      {showTable && (
        <TableStatisticDialog onClose={() => setShowTable(false)} />
      )}
    </>
  );
};
