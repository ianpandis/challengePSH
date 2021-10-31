import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import { getStats } from "../services";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { CSVLink } from "react-csv";

interface IStatTableProps {}

const StatTable: React.FunctionComponent<IStatTableProps> = (props) => {
  const [stats, setStats]: React.SetStateAction<any> = useState(null);
  const [lastUpdate, setLastUpdate]: React.SetStateAction<any> = useState(null);
  const csvLinkRef = useRef<
    CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }
  >(null);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchStats();
    }, 10000);
    return () => clearInterval(interval);
  });

  const fetchStats = async () => {
    const data = await getStats();
    setStats(data.stats);
    setLastUpdate(data.lastUpdate);
  };

  const exportToCSV = () => {
    csvLinkRef?.current?.link.click();
  };

  if (!stats)
    return (
      <Typography
        style={{
          display: "inline-block",
          backgroundColor: "white",
          border: "1px solid #000000",
          borderRadius: "8px",
          padding: "6px 10px",
          marginRight: "20px",
        }}
        variant="button"
        display="block"
        gutterBottom
      >
        Loading...
      </Typography>
    );
  if (stats.length === 0)
    return (
      <Typography
        style={{
          display: "inline-block",
          backgroundColor: "white",
          border: "1px solid #000000",
          borderRadius: "8px",
          padding: "6px 10px",
          marginRight: "20px",
        }}
        variant="button"
        display="block"
        gutterBottom
      >
        No stats available
      </Typography>
    );
  return (
    <div style={{ width: "650px" }}>
      <TableContainer component={Paper} style={{ marginBottom: "10px" }}>
        <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography style={{ fontWeight: "bold" }}>RANK</Typography>
              </TableCell>
              <TableCell>
                <Typography style={{ fontWeight: "bold" }}>PICTURE</Typography>
              </TableCell>
              <TableCell>
                <Typography style={{ fontWeight: "bold" }}>NICKNAME</Typography>
              </TableCell>
              <TableCell>
                <Typography style={{ fontWeight: "bold" }}>SCORE</Typography>
              </TableCell>
              <TableCell>
                <Typography style={{ fontWeight: "bold" }}>
                  DATE TIME
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.map((stat: any) => (
              <TableRow
                key={stat.nickname}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Typography>{stat.rank}</Typography>
                </TableCell>
                <TableCell>
                  <img
                    className="stat-table-item-column"
                    src={stat.image}
                    alt="player avatar"
                  />
                </TableCell>
                <TableCell>
                  <Typography>{stat.nickname}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{stat.score}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{stat.ts}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          display: "inline-block",
          backgroundColor: "white",
          border: "1px solid #000000",
          borderRadius: "8px",
          padding: "6px 10px",
          marginRight: "20px",
        }}
      >
        <Typography variant="button" display="block" gutterBottom>
          Last stats generated: {lastUpdate}
        </Typography>
      </div>

      <Button variant="contained" onClick={exportToCSV}>
        Export to CSV
      </Button>
      <CSVLink
        data={stats}
        filename="top10players.csv"
        className="hidden"
        ref={csvLinkRef}
        target="_blank"
      />
    </div>
  );
};

export default StatTable;
