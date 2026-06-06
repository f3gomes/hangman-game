import { AxiosInstance } from "axios";

export interface RankingItem {
  nick: string;
  points: number;
}

export const handleGetRanking = async (
  playerName: string,
  setRankingTable: React.Dispatch<React.SetStateAction<RankingItem[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  apiRank: AxiosInstance,
): Promise<void> => {
  setIsLoading(true);

  try {
    const { data } = await apiRank.get<RankingItem[]>("/ranking");

    setRankingTable(data);
    const player = data.find((item) => item.nick === playerName);

    localStorage.setItem("points", String(player?.points ?? 0));
  } catch (error) {
    console.error("Erro ao carregar ranking:", error);

    setRankingTable([]);
    localStorage.setItem("points", "0");
  } finally {
    setIsLoading(false);
  }
};
