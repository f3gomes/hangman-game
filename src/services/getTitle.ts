import { api } from "./api";

export const handleGetTitle = async (
  name: string,
  setChampionTitle: (name: string) => void
) => {
  if (name === "Wukong") {
    name = "MonkeyKing";
  }

  if (name === "Bardo") {
    name = "Bard";
  }

  if (name === "RenataGlasc") {
    name = "Renata";
  }

  try {
    const resp = await api("");
    const arr = resp.data.data;
    setChampionTitle(arr[`${name}`]?.title);
  } catch (err) {
    console.log(err);
  }
};
