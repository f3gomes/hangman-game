import { api } from "./api";

export const handleGetTitle = async (
  name: string,
  setChampionTitle: (name: string) => void
) => {
  try {
    const resp = await api("");
    const arr = resp.data.data;
    setChampionTitle(arr[`${name}`]?.title);
  } catch (err) {
    console.log(err);
  }
};
