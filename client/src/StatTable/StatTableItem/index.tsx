import React from "react";
import "./index.css";

export interface IStatTableItemProps {
  rank: number;
  picture: string;
  player: string;
  score: number;
  statTime: string;
}
const StatTableItem: React.FunctionComponent<IStatTableItemProps> = (props) => {
  const { rank, picture, player, score, statTime } = props;
  return (
    <div className="stat-table-item-container">
      <div className="stat-table-item-column1">{rank}</div>
      <img className="stat-table-item-column" src={picture}></img>
      <div className="stat-table-item-column">{player}</div>
      <div className="stat-table-item-column">{score}</div>
      <div className="stat-table-item-column">{statTime}</div>
    </div>
  );
};

export default StatTableItem;
