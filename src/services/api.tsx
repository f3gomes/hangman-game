import axios from "axios";

export const apiChampions = axios.create({
  baseURL: import.meta.env.VITE_API_CHAMPIONS,
});

export const apiRank = axios.create({
  baseURL: import.meta.env.VITE_API_KEY,
});
