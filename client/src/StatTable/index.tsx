import * as React from "react";
import "./index.css";
import StatTableItem from "./StatTableItem";
import StatTableHeader from "./StatTableHeader";
import Button from "@mui/material/Button";
import { getStats } from "../services";
import statsTmp from "./stats.json";

interface IStatTableProps {}

const StatTable: React.FunctionComponent<IStatTableProps> = (props) => {
  const [stats, setStats]: React.SetStateAction<any> = React.useState(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      fetchStats();
    }, 10000);
    return () => clearInterval(interval);
  });

  const fetchStats = () => {
    async function _fetchStats() {
      const data = await getStats();
      setStats(data);
    }
    _fetchStats();
  };

  if (!stats) return <h1>Loading...</h1>;
  if (stats.length === 0) return <h1>No stats</h1>;

  return (
    <div className="stat-table-container">
      <StatTableHeader />
      {stats.map((stat: any, index: number) => (
        <StatTableItem
          rank={index + 1}
          player={stat.nickname}
          picture={stat.picture}
          score={stat.score}
          statTime={stat.ts}
        />
      ))}
      <h3>Last stat generated: 2021/10/17 21:13:00</h3>
      <Button
        variant="contained"
        onClick={() => {
          alert("Hola");
        }}
      >
        Export to csv
      </Button>
    </div>
  );
};

export default StatTable;
