import NodeCache from "node-cache";
import { db } from "./index.js";

export const cache = new NodeCache({ stdTTL: 300 });

export function saveDataInCacheProcess() {
  setInterval(() => {
    console.log("Arranca el proceso saveDataInCacheProcess");
    saveDataInCache();
  }, 1 * 30 * 1000);
}

export function saveDataInCache() {
  db.query(
    "select nickname, score, image, ts from stat inner join player on player_nickname = nickname order by score desc limit 10;",
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(
          "CONSOLEO RESULTADO DEL SELECT DE LAS TABLAS STATS Y PLAYERS"
        );
        console.log(result);
        const lastUpdate = currentDateTime();
        cache.set(1, { stats: result, lastUpdate: lastUpdate });
      }
    }
  );
}

function currentDateTime() {
  let date_ob = new Date();
  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);
  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  // current year
  let year = date_ob.getFullYear();
  // current hours
  let hours = date_ob.getHours();
  // current minutes
  let minutes = date_ob.getMinutes();
  // current seconds
  let seconds = date_ob.getSeconds();
  // prints date & time in YYYY-MM-DD HH:MM:SS format
  return (
    year +
    "-" +
    month +
    "-" +
    date +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds
  );
}
