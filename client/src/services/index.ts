import axios, { AxiosResponse } from "axios";
/**
 * Creates an api client to interact with the backend. */

// interface StatsType {
//   picture: string;
//   nickname: string;
//   score: number;
// }

const apiClient = axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 10000,
});

export const getStats: () => Promise<any> = async () => {
  let res: AxiosResponse;
  try {
    res = await apiClient.get("stats");
  } catch (error) {
    return [];
  }
  return formatResponse(res.data);
};

function formatResponse(data: any) {
  if (data.stats.lenght === 0) return [];
  for (let i = 0; i < data.stats.length; i++) {
    const player = data.stats[i];
    player.rank = i + 1;
    player.ts = formatTS(player.ts);
  }
  return data;
}

function formatTS(timestamp: string) {
  let tsAux = timestamp.split("T");
  let date = tsAux[0];
  let time = tsAux[1].split(".")[0];
  return `${date} ${time}`;
}
