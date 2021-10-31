import { db } from "./index.js";
import axios from "axios";

/**
 * Process that inserts stats into the db every 5 minutes
 */
export function statLoaderProcess() {
  setInterval(() => {
    console.log("Arranca el proceso statLoaderProcess");
    statLoader();
  }, 5 * 60 * 1000);
}

/**
 * Retreives players data and generates stats.
 */
export async function statLoader() {
  const number_of_players = randomIntFromInterval(0, 10);
  console.log(`Se generan ${number_of_players} players}`);
  if (number_of_players === 0) return;
  let players = await getPlayers(number_of_players);
  console.log("Consoleo los players");
  console.log(players);
  insertPlayerStats(players);
}

/**
 * Fetches players data from the api provided.
 * @param {number} number_of_players
 * @returns Array of players.
 */
async function getPlayers(number_of_players) {
  let players = [];

  for (let i = 0; i < number_of_players; i++) {
    await axios
      .get("https://randomuser.me/api")
      .then((res) => {
        players.push({
          nickname: res.data.results[0].login.username,
          picture: res.data.results[0].picture.thumbnail,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return players;
}

/**
 * Inserts player data and stats into db.
 * @param {{ nickname: string, picture: string }[]} players
 */
function insertPlayerStats(players) {
  let player_score;
  players.forEach((player) => {
    db.query(
      "insert into player (nickname, image) VALUES (?,?) on duplicate key update image = ?;",
      [player.nickname, player.picture, player.picture],
      (error) => {
        if (error) console.log(error);
      }
    );

    player_score = randomIntFromInterval(0, 100);
    db.query(
      "insert into stat (player_nickname, score) VALUES (?, ?);",
      [player.nickname, player_score],
      (error) => {
        if (error) throw error;
      }
    );
  });
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
