export const handleGetRanking = async (
  playerName: string,
  setRankingTable: any,
  setIsLoading: any,
  apiRank: any
) => {
  try {
    setIsLoading(true);
    const resp = await apiRank.get("/ranking");

    setRankingTable(resp.data);

    const filter = resp.data.filter(
      (item: any) => item?.nick === playerName
    )[0];

    if (filter?.points) {
      localStorage.setItem("points", filter?.points);
    } else {
      localStorage.setItem("points", "0");
    }
  } catch (err) {
    console.log(err);
  } finally {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }
};
