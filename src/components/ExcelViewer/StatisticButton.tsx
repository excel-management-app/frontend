import { Button, colors } from "@mui/material";
import { useState } from "react";
import TableStatisticDialog from "./TableStatisticDialog";
import { makeStyles } from "tss-react/mui";
const useStyles = makeStyles()(() => ({
  button: {
    height: 40,
    backgroundColor: colors.grey["100"],
    color: colors.grey["900"],
  },
}));

export const StatisticButton = () => {
  const { classes } = useStyles();
  const [showTable, setShowTable] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setShowTable(true)}
        className={classes.button}
      >
        Xem thống kê
      </Button>
      {showTable && (
        <TableStatisticDialog onClose={() => setShowTable(false)} />
      )}
    </>
  );
};
