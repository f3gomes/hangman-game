import { useCallback, useEffect, useState } from "react";
import { champions } from "./data/list";
import HangmanDraw from "./components/HangmanDraw";
import HangmanName from "./components/HangmanName";
import Keyboard from "./components/Keyboard";
import ModalResult from "./components/ModalResult";
import logo from "./assets/logo.svg";
import rankingIcon from "./assets/ranking_icon.svg";
import { getTitle } from "./services/api";
import Loading from "./components/Loading";

const newName = () => {
  return champions[Math.floor(Math.random() * champions.length)];
};

function App() {
  const [championName, setChampionName] = useState(newName().toLowerCase());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [showModalResult, setShowModalResult] = useState(false);
  const [splashImg, setSplashImg] = useState("");
  const [championTitle, setChampionTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const missedLetters = guessedLetters.filter(
    (letter) => !championName.includes(letter)
  );

  const isLoser = missedLetters.length >= 6;
  const isWinnner = championName
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const handleIncludeGuessedLetter = useCallback(
    (key: string) => {
      if (guessedLetters.includes(key) || isLoser || isWinnner) return;

      setGuessedLetters((currentLetters) => [...currentLetters, key]);
    },
    [guessedLetters, isWinnner, isLoser]
  );

  const handleGetTitle = async (name: string) => {
    try {
      const resp = await getTitle("");
      const arr = resp.data.data;
      setChampionTitle(arr[`${name}`].title);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetSplash = async (championName: string) => {
    try {
      fetch(
        `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_0.jpg`
      )
        .then((res) => {
          return res.blob();
        })
        .then((blob) => {
          let img = URL.createObjectURL(blob);
          setSplashImg(img);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseModal = () => {
    setShowModalResult(false);
  };

  const handleShowModal = () => {
    if (isWinnner || isLoser) {
      setIsLoading(true);
      let champion =
        championName.charAt(0).toUpperCase() + championName.slice(1);
      handleGetSplash(champion);
      handleGetTitle(champion);
      setTimeout(() => {
        setShowModalResult(true);
        setIsLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    handleShowModal();
  }, [isWinnner]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;
      e.preventDefault();
      handleIncludeGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;
      e.preventDefault();
      setGuessedLetters([]);
      setChampionName(newName().toLowerCase());
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  return (
    <div className="max-w-3xl flex flex-col gap-8 my-0 mx-auto items-center mt-5">
      <img src={logo} alt="logotipo" className="absolute -left-3 -top-2" />
      <div className="absolute right-0 top-0">
        <img src={rankingIcon} alt="ranking icon" />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="text-4xl text-center absolute right-0 bottom-0">
            {isWinnner && "Win"}
            {isLoser && "Lose"}
          </div>
          <HangmanDraw guesses={missedLetters.length} />
          <HangmanName
            reveal={isLoser}
            guessedLetters={guessedLetters}
            nameToGuess={championName}
          />
          <div className="self-stretch mt-10 mxl:mt-2">
            <Keyboard
              disabled={isWinnner || isLoser}
              activeLetters={guessedLetters.filter((letter) =>
                championName.includes(letter)
              )}
              inactiveLetters={missedLetters}
              handleIncludeGuessedLetter={handleIncludeGuessedLetter}
            />
          </div>
          <ModalResult
            show={showModalResult}
            closeModal={handleCloseModal}
            splash={splashImg}
            championName={
              championName.charAt(0).toUpperCase() + championName.slice(1)
            }
            championTitle={championTitle}
            isWinner={isWinnner}
          />
        </>
      )}
    </div>
  );
}

export default App;
