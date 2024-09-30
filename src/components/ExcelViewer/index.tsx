import React, { useEffect, useMemo, useState } from "react";
import { readFileApi } from "../../apis/read";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";

export const ExcelViewer = () => {
  const [jsonData, setJsonData] = useState<string[][]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await readFileApi();
        setJsonData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const headers = useMemo<string[]>(() => {
    if (jsonData?.length) {
      return jsonData[0];
    } else {
      return [];
    }
  }, [jsonData]);
  const rows = useMemo(() => {
    if (jsonData?.length) {
      return jsonData.slice(1);
    } else {
      return [];
    }
  }, [jsonData]);

  const VirtuosoTableComponents: TableComponents<string[]> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableHead {...props} ref={ref} />
    )),
    TableRow,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };
  function fixedHeaderContent() {
    return (
      <TableRow>
        {headers.map((column) => (
          <TableCell
            key={column}
            variant="head"
            sx={{ backgroundColor: "background.paper" }}
          >
            {column}
          </TableCell>
        ))}
      </TableRow>
    );
  }
  function rowContent(_index: number, row: string[]) {
    return (
      <React.Fragment>
        {headers.map((column) => (
          <TableCell key={column}>{row[headers.indexOf(column)]}</TableCell>
        ))}
      </React.Fragment>
    );
  }

  return loading ? (
    <>Loading</>
  ) : (
    <div>
      Excel Viewer
      <Paper style={{ height: 600, width: "100%" }}>
        <TableVirtuoso
          data={rows}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>
    </div>
  );
};
