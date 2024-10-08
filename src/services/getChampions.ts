import { apiChampions } from "./api";

export const handleGetChampionsList = async () => {
  try {
    const resp = await apiChampions("");
    const arr = resp.data.data;

    return Object.values(arr).map((e: any) => ({
      id: e.id,
      name: e.name,
      title: e.title,
    }));
  } catch (err) {
    console.log(err);
  }
};
