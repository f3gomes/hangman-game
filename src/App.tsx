import React, { useCallback, useEffect, useRef, useState } from "react";
import { champions } from "./data/list";
import HangmanDraw from "./components/HangmanDraw";
import HangmanName from "./components/HangmanName";
import Keyboard from "./components/Keyboard";
import ModalResult from "./components/ModalResult";
import logo from "./assets/logo.svg";
import rankingIcon from "./assets/ranking_icon.svg";
import { apiRank } from "./services/api";
import Ranking from "./components/Ranking";
import Footer from "./components/Footer";
import ModalEnterNick from "./components/ModalEnterNick";
import ModalCredits from "./components/ModalCredits";
import { calculatePoints } from "./functions/calculatePoints";
import { handleGetTitle } from "./services/getTitle";
import { handleGetSplash } from "./services/getSplash";

const newName = () => {
  return champions[Math.floor(Math.random() * champions.length)];
};

function App() {
  const [championName, setChampionName] = useState(newName());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [showModalResult, setShowModalResult] = useState(false);
  const [showModalRanking, setShowModalRanking] = useState(false);
  const [showModalCredits, setShowModalCredits] = useState(false);
  const [showModalNick, setShowModalNick] = useState(
    localStorage.getItem("nick") ? false : true
  );
  const [splashImg, setSplashImg] = useState("");
  const [championTitle, setChampionTitle] = useState("");
  const [wonTheGame, setWonTheGame] = useState(false);
  const [plusPoints, setPlusPoints] = useState<number>(0);
  const [openModalClass, setOpenModalClass] = useState(
    localStorage.getItem("nick" ? "" : "modal-blur")
  );
  const [nickPlayer, setNickPlayer] = useState<any>(
    localStorage.getItem("nick" || "")
  );

  const missedLetters = guessedLetters.filter(
    (letter) => !championName.toLocaleLowerCase().includes(letter)
  );

  const refOne = useRef<any>(null);

  const isLoser = missedLetters.length >= 6;

  const isWinnner = championName
    .toLocaleLowerCase()
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const toggleModalRanking = () => {
    setShowModalRanking(!showModalRanking);
  };

  const handleIncludeGuessedLetter = useCallback(
    (key: string) => {
      if (guessedLetters.includes(key) || isLoser || isWinnner) return;

      setGuessedLetters((currentLetters) => [...currentLetters, key]);
    },
    [guessedLetters, isWinnner, isLoser]
  );

  const handleCloseModal = () => {
    setShowModalResult(false);
  };

  const handleShowModal = () => {
    if (isWinnner) {
      setWonTheGame(true);
      setShowModalResult(true);
      setOpenModalClass("modal-blur");
      apiRank.post("/new", {
        nick: nickPlayer,
        gamePoints: calculatePoints(
          true,
          championName,
          missedLetters,
          setPlusPoints
        ),
      });
    }

    if (isLoser) {
      setPlusPoints(0);
      setWonTheGame(false);
      setShowModalResult(true);
      setOpenModalClass("modal-blur");
      apiRank.post("/new", {
        nick: nickPlayer,
        gamePoints: calculatePoints(
          true,
          championName,
          missedLetters,
          setPlusPoints
        ),
      });
    }
  };

  const handleStartGame = async () => {
    setShowModalNick(false);
    setOpenModalClass("");
    localStorage.setItem("nick", nickPlayer);
    await apiRank.post("/new", { nick: nickPlayer });
    location.reload();
  };

  const handleOpenCredits = () => {
    setShowModalCredits(!showModalCredits);
  };

  const handleClickOutside = (event: any) => {
    if (!refOne?.current?.contains(event.target)) {
      setShowModalRanking(false);
    }
  };

  useEffect(() => {
    handleShowModal();
  }, [isWinnner, isLoser]);
  ("");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;
      e.preventDefault();
      setShowModalResult(false);
      setOpenModalClass("");
      setGuessedLetters([]);
      setChampionName(newName());
    };

    document.addEventListener("keypress", handler);
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  useEffect(() => {
    handleGetTitle(championName, setChampionTitle);
    handleGetSplash(championName, setSplashImg);
  }, [championName]);

  return (
    <div className="msl:w-11/12">
      <div className="flex justify-center">
        <ModalEnterNick
          show={showModalNick}
          handleStartGame={handleStartGame}
          onDisabled={nickPlayer ? false : true}
          handleOnChange={(event: React.FormEvent<HTMLInputElement>) =>
            setNickPlayer(event.currentTarget.value)
          }
        />
        <ModalResult
          splash={splashImg}
          isWinner={wonTheGame}
          show={showModalResult}
          plusPoints={plusPoints}
          closeModal={handleCloseModal}
          championTitle={championTitle}
          championName={
            championName.toLocaleLowerCase().charAt(0).toUpperCase() +
            championName.slice(1)
          }
        />
      </div>
      <div
        className={`max-w-3xl flex flex-col gap-8 my-0 mx-auto items-center first-blur ${openModalClass}`}
      >
        <img
          src={logo}
          alt="logotipo"
          className="absolute left-3 top-2 w-64 msl:w-28"
        />
        <button
          className="absolute right-5 top-5 cursor-pointer focus:outline-none"
          disabled={showModalNick}
          onClick={toggleModalRanking}
        >
          <img src={rankingIcon} alt="ranking icon" />
        </button>

        <div className={`${showModalNick ? "invisible" : ""} -mt-9`}>
          <HangmanDraw guesses={missedLetters.length} />
        </div>
        {!showModalResult && (
          <>
            <HangmanName
              reveal={isLoser}
              guessedLetters={guessedLetters}
              nameToGuess={championName.toLocaleLowerCase()}
            />
            <div className="self-stretch msl:ml-10">
              <Keyboard
                disabled={isWinnner || isLoser}
                activeLetters={guessedLetters.filter((letter) =>
                  championName.toLocaleLowerCase().includes(letter)
                )}
                inactiveLetters={missedLetters}
                handleIncludeGuessedLetter={handleIncludeGuessedLetter}
              />
            </div>
          </>
        )}

        <Ranking show={showModalRanking} key={missedLetters.length} />
        <ModalCredits show={showModalCredits} />
        <Footer handleOpenCredits={handleOpenCredits} show={showModalResult} />
      </div>
    </div>
  );
}

export default App;
