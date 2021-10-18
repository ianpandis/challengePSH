import express from "express";
import mysql from "mysql";
// import cors from "cors";

const app = express();

// app.use(cors());
app.use(express.json());

export const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "psh_challenge",
});

db.query(
  "create table if not exists stat ( id int auto_increment primary key, player_nickname varchar(100) not null , score tinyint not null , ts timestamp default current_timestamp()) charset=utf8;"
);
db.query(
  "create table if not exists player ( nickname varchar(100) primary key, image text) charset=utf8;"
);

app.get("/stats", (req, res) => {
  //Ir contra el cache

  db.query("SELECT * FROM stats WHERE ");
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});

/**
 * 
 * Get en caso de que no se quiera repetir players en el top 10
 * 
select player_nickname, max(score) max_score, ts, image
from stat
inner join player on nickname = player_nickname
group by player_nickname
order by max_score desc limit 10;
 */
