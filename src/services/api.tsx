import axios from "axios";

export const api = axios.create({
  baseURL:
    "https://ddragon.leagueoflegends.com/cdn/12.21.1/data/pt_BR/champion.json",
});

export const getTitle = axios.create({
  baseURL:
    "https://ddragon.leagueoflegends.com/cdn/12.21.1/data/pt_BR/champion.json",
});

export const getRanking = axios.create({
  baseURL: "https://hangman-api.onrender.com/ranking",
});

export const postRanking = axios.create({
  baseURL: "https://hangman-api.onrender.com/new",
});
