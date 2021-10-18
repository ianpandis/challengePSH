import React from "react";
import "./index.css";

const StatTableHeader: React.FunctionComponent = () => {
  return (
    <div className="stat-table-header-container">
      <h2 className="stat-table-header-field">RANK</h2>
      <h2 className="stat-table-header-field">AVATAR</h2>
      <h2 className="stat-table-header-field">NICKNAME</h2>
      <h2 className="stat-table-header-field">SCORE</h2>
    </div>
  );
};

export default StatTableHeader;
