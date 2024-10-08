import axios from "axios";

export const handleGetSplash = async (championNameId: string) => {
  try {
    const resp = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championNameId}_0.jpg`,
      {
        responseType: "blob",
      }
    );

    const splash = URL.createObjectURL(resp.data);
    return splash;
  } catch (err) {
    console.log(err);
  }
};
