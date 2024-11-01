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
  const { currentChampion, isLoading, setIsLoading, fetchList } =
    useGlobalContext();

  const [currentPoints, setCurrentPoints] = useState(0);
  const [wonTheGame, setWonTheGame] = useState(false);

  const [firstGame, setFirstGame] = useState(false);
  const [showModalResult, setShowModalResult] = useState(false);
  const [showModalRanking, setShowModalRanking] = useState(false);
  const [showModalCredits, setShowModalCredits] = useState(false);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [championName, setChampionName] = useState("");
  const [audioSrc, setAudioSrc] = useState("");

  const [showModalHelp, setShowModalHelp] = useState(
    localStorage.getItem("nick") ? false : true
  );

  const [showModalNick, setShowModalNick] = useState(
    localStorage.getItem("nick") ? false : true
  );

  const [openModalClass, setOpenModalClass] = useState(
    localStorage.getItem("nick") ? "" : "modal-blur"
  );

  const [nickPlayer, setNickPlayer] = useState(
    localStorage.getItem("nick") || ""
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
    localStorage.setItem("nick", e.currentTarget.value);
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
    handleNewGame();
  };

  const resultGame = (result: boolean) => {
    setWonTheGame(result);
    setShowModalResult(true);
    setOpenModalClass("modal-blur");

    if (result) {
      setAudioSrc("/victory.mp3");
    } else {
      setAudioSrc("/defeat.mp3");
    }

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
    setIsLoading(true);
    setShowModalResult(false);
    setOpenModalClass("");
    setGuessedLetters([]);
    setAudioSrc("");
    fetchList();
  };

  const handleStartFirstGame = async () => {
    setShowModalNick(false);
    setFirstGame(false);
    setOpenModalClass("");

    await apiRank.post("/ranking/new", { nick: nickPlayer, points: 0 });
  };

  const handleClickOutside = (event: any) => {
    if (!refOne?.current?.contains(event.target)) {
      setOpenModalClass("");
      setShowModalHelp(false);
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
          disabled={showModalNick}
          onClick={handleOpenRanking}
          className="absolute right-4 top-4 cursor-pointer brightness-90 transition hover:brightness-125 focus:outline-none"
        >
          <img src={rankingIcon} alt="ranking icon" />
        </button>
      </div>

      <div className="flex justify-center">
        <Ranking
          show={showModalRanking}
          playerName={nickPlayer}
          key={missedLetters.length}
        />

        <ModalEnterNick
          show={showModalNick}
          handleOnChange={handleSaveNick}
          handleStartGame={handleStartFirstGame}
          onDisabled={nickPlayer ? false : true}
        />

        <ModalResult
          audioSrc={audioSrc}
          isWinner={wonTheGame}
          show={showModalResult}
          currentPoints={currentPoints}
          handleClose={handleCloseModal}
        />

        <ModalHelp show={showModalHelp} />
        <ModalCredits show={showModalCredits} />
      </div>

      {!showModalResult && !firstGame && !showModalNick && (
        <div className={cn(openModalClass, "first-blur")}>
          {isLoading ? (
            <div className="h-svh flex justify-center">
              <Loading />
            </div>
          ) : (
            <div className="flex flex-col gap-8 my-0 mx-auto items-center justify-center h-svh tall:gap-6">
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
            </div>
          )}
        </div>
      )}

      <Footer
        show={true}
        handleOpenHelp={handleOpenHelp}
        handleOpenCredits={handleOpenCredits}
      />
    </div>
  );
}

export default App;
