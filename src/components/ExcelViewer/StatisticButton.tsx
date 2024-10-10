import { Button } from "@mui/material";
import { useState } from "react";
import TableStatisticDialog from "./TableStatisticDialog";

export const StatisticButton = () => {
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
