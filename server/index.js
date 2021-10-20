import express from "express";
import mysql from "mysql";
import {
  cache,
  saveDataInCacheProcess,
  saveDataInCache,
} from "./cacheStats.js";
import { statLoaderProcess, statLoader } from "./statLoader.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

/**
 * Db connection and 'stat', 'player' tables initialized.
 */
export const db = mysql.createConnection({
  user: "root",
  host: process.env.DB_HOST,
  password: "secret",
  database: "psh_challenge",
});

db.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    process.exit(0);
  }
});

db.query(
  "create table if not exists stat ( id int auto_increment primary key, player_nickname varchar(100) not null , score tinyint not null , ts timestamp default current_timestamp()) charset=utf8;",
  (error) => {
    if (error) throw error;
  }
);
db.query(
  "create table if not exists player ( nickname varchar(100) primary key, image text) charset=utf8;",
  (error) => {
    if (error) throw error;
  }
);

app.get("/stats", (req, res) => {
  if (cache.has(1)) {
    // console.log(cache.get(1));
    return res.status(200).json(cache.get(1));
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});

statLoader();
setTimeout(() => {
  saveDataInCache();
}, 5000);
statLoaderProcess();
saveDataInCacheProcess();
