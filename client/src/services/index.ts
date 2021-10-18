import axios, { AxiosResponse } from "axios";
/**
 * Creates an api client to interact with the backend. */

interface StatsType {
  picture: string;
  nickname: string;
  score: number;
}

const apiClient = axios.create({
  baseURL: "localhost:3000/",
  timeout: 10000,
});

export const getStats: () => Promise<any> = async () => {
  let res: AxiosResponse;
  try {
    res = await apiClient.get("stats");
  } catch (error) {
    return [];
  }
  return res.data;
};
