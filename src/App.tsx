import React, { useCallback, useEffect, useRef, useState } from "react";

import cn from "./functions/cn";
import logo from "./assets/logo.png";
import Footer from "./components/Footer";
import Ranking from "./components/Ranking";
import Loading from "./components/Loading";
import Keyboard from "./components/Keyboard";
import ModalHelp from "./components/ModalHelp";
import ModalResult from "./components/ModalResult";
import HangmanName from "./components/HangmanName";
import HangmanDraw from "./components/HangmanDraw";
import rankingIcon from "./assets/ranking_icon.svg";
import ModalCredits from "./components/ModalCredits";
import ModalEnterNick from "./components/ModalEnterNick";

import { apiRank } from "./services/api";
import { useGlobalContext } from "./context/global";
import { calculatePoints } from "./functions/calculatePoints";

function App() {
  const { currentChampion, isLoading, fetchList } = useGlobalContext();

  const [currentPoints, setCurrentPoints] = useState(0);
  const [wonTheGame, setWonTheGame] = useState(false);

  const [firstGame, setFirstGame] = useState(false);
  const [showModalResult, setShowModalResult] = useState(false);
  const [showModalRanking, setShowModalRanking] = useState(false);
  const [showModalCredits, setShowModalCredits] = useState(false);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [championName, setChampionName] = useState("");

  const [showModalHelp, setShowModalHelp] = useState(
    localStorage.getItem("nick") ? false : true
  );

  const [showModalNick, setShowModalNick] = useState(
    localStorage.getItem("nick") ? false : true
  );

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

  const isWinner =
    championName !== "" &&
    championName
      .toLocaleLowerCase()
      .split("")
      .every((letter) => guessedLetters.includes(letter));

  const handleSaveNick = (e: React.FormEvent<HTMLInputElement>) => {
    setNickPlayer(e.currentTarget.value);
  };

  const handleOpenRanking = () => {
    setShowModalRanking(true);
  };

  const handleOpenCredits = () => {
    setShowModalCredits(true);
  };

  const handleIncludeGuessedLetter = useCallback(
    (key: string) => {
      if (guessedLetters.includes(key) || isLoser || isWinner) return;
      setGuessedLetters((currentLetters) => [...currentLetters, key]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  const handleCloseModal = () => {
    setShowModalResult(false);
  };

  const resultGame = (result: boolean) => {
    setWonTheGame(result);
    setShowModalResult(true);
    setOpenModalClass("modal-blur");

    apiRank.post("/ranking/new", {
      nick: nickPlayer,
      points: calculatePoints(
        result,
        championName,
        missedLetters,
        setCurrentPoints
      ),
    });
  };

  const handleShowModal = () => {
    if (isWinner) {
      resultGame(true);
    }

    if (isLoser) {
      setCurrentPoints(0);
      resultGame(false);
    }
  };

  const handleNewGame = () => {
    setShowModalResult(false);
    setOpenModalClass("");
    setGuessedLetters([]);
    fetchList();
  };

  const handleStartFirstGame = async () => {
    setShowModalNick(false);
    setFirstGame(false);
    setOpenModalClass("");

    localStorage.setItem("nick", nickPlayer);
    await apiRank.post("/ranking/new", { nick: nickPlayer, points: 0 });
  };

  const handleClickOutside = (event: any) => {
    if (!refOne?.current?.contains(event.target)) {
      setShowModalHelp(false);
      setOpenModalClass("");
      setShowModalRanking(false);
      setShowModalCredits(false);
    }
  };

  const handleOpenHelp = () => {
    setShowModalHelp(!showModalHelp);
  };

  useEffect(() => {
    handleShowModal();
  }, [isWinner, isLoser]);

  useEffect(() => {
    if (localStorage.getItem("nick")) {
      setShowModalHelp(false);
    }

    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;
      e.preventDefault();
      handleNewGame();
    };

    document.addEventListener("keypress", handler);
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  useEffect(() => {
    const fetchName = async () => {
      if (!isLoading && currentChampion.name) {
        setChampionName(currentChampion.name);
      }
    };

    fetchName();
  }, [currentChampion]);

  return (
    <div>
      <div className="header">
        <img
          src={logo}
          alt="logotipo"
          className="absolute !left-4 !top-4 w-64 msl:w-28 msl:left-auto msl:top-3"
        />

        <button
          className={cn(
            showModalResult && "disabled",
            "absolute right-4 top-4 cursor-pointer brightness-90 transition hover:brightness-125 focus:outline-none"
          )}
          disabled={showModalNick}
          onClick={handleOpenRanking}
        >
          <img src={rankingIcon} alt="ranking icon" />
        </button>
      </div>

      <div className="flex justify-center">
        <Ranking show={showModalRanking} key={missedLetters.length} />

        <ModalEnterNick
          show={showModalNick}
          handleStartGame={handleStartFirstGame}
          onDisabled={nickPlayer ? false : true}
          handleOnChange={handleSaveNick}
        />

        <ModalResult
          isWinner={wonTheGame}
          show={showModalResult}
          currentPoints={currentPoints}
          closeModal={handleCloseModal}
          championType={currentChampion}
        />

        <ModalHelp show={showModalHelp} />
        <ModalCredits show={showModalCredits} />
      </div>

      {!showModalResult && !firstGame && !showModalNick && (
        <div
          className={cn(
            openModalClass,
            "flex flex-col gap-8 my-0 mx-auto items-center first-blur"
          )}
        >
          {isLoading ? (
            <div className="h-screen flex">
              <Loading />
            </div>
          ) : (
            <>
              <HangmanDraw
                guesses={missedLetters.length}
                show={showModalNick || showModalResult}
              />

              <HangmanName
                reveal={isLoser}
                guessedLetters={guessedLetters}
                nameToGuess={championName.toLocaleLowerCase()}
              />

              <Keyboard
                disabled={isWinner || isLoser}
                inactiveLetters={missedLetters}
                handleIncludeGuessedLetter={handleIncludeGuessedLetter}
                activeLetters={guessedLetters.filter((letter) =>
                  championName.toLocaleLowerCase().includes(letter)
                )}
              />
            </>
          )}
        </div>
      )}

      <Footer
        show={showModalResult}
        handleOpenHelp={handleOpenHelp}
        handleOpenCredits={handleOpenCredits}
      />
    </div>
  );
}

export default App;
