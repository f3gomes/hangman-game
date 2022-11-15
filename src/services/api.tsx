import axios from "axios";

export const api = axios.create({
  baseURL:
    "https://ddragon.leagueoflegends.com/cdn/12.21.1/data/pt_BR/champion.json",
});

export const apiRank = axios.create({
  baseURL: "https://ranking-app.adaptable.app",
});
