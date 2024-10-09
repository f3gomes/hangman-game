import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { handleGetSplash } from "../services/getSplash";
import { handleGetChampionsList } from "../services/getChampions";

export interface CurrentChampionProps {
  id?: string;
  name?: string;
  title?: string;
  splash?: string;
}

interface ContextType {
  fetchList: () => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  championList: string[];
  setChampionList: (value: any) => void;
  currentChampion: CurrentChampionProps;
  setCurrentChampion: (value: CurrentChampionProps) => void;
}

export const GlobalContext = createContext<ContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: PropsWithChildren) => {
  const [championList, setChampionList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<ContextType["isLoading"]>(true);
  const [currentChampion, setCurrentChampion] = useState<CurrentChampionProps>(
    {}
  );

  const fetchList = async () => {
    try {
      // const newGame = Math.floor(
      //   Math.random() * import.meta.env.VITE_TOTAL_CHAMPIONS
      // );
      const newGame = 10;

      const list = await handleGetChampionsList();
      const splash = await handleGetSplash(list![newGame]?.id);

      const { id, name, title } = list![newGame];

      const champion = {
        id,
        name,
        title,
        splash,
      };

      setCurrentChampion(champion);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        fetchList,
        isLoading,
        setIsLoading,
        championList,
        setChampionList,
        currentChampion,
        setCurrentChampion,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobalContext must be used inside the GlobalProvider");
  }

  return context;
};
