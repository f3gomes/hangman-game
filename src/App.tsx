import { useCallback, useEffect, useState } from "react";
import { champions } from "./data/list";
import HangmanDraw from "./components/HangmanDraw";
import HangmanName from "./components/HangmanName";
import Keyboard from "./components/Keyboard";
import ModalResult from "./components/ModalResult";
import logo from "./assets/logo.svg";
import rankingIcon from "./assets/ranking_icon.svg";
import { api, apiRank } from "./services/api";
import Ranking from "./components/Ranking";
import Footer from "./components/Footer";
import ModalEnterNick from "./components/ModalEnterNick";
import copyright from "./assets/copyright.svg";
import ModalCredits from "./components/ModalCredits";

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

  const handleGetTitle = async (name: string) => {
    try {
      const resp = await api("");
      const arr = resp.data.data;
      setChampionTitle(arr[`${name}`]?.title);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetSplash = async (championName: string) => {
    let name = championName.charAt(0).toUpperCase() + championName.slice(1);
    try {
      fetch(
        `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_0.jpg`
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
    if (isWinnner) {
      setWonTheGame(true);
      setShowModalResult(true);
      setOpenModalClass("modal-blur");
      apiRank.post("/new", {
        nick: nickPlayer,
        gamePoints: calculatePoints(true),
      });
    }

    if (isLoser) {
      setPlusPoints(0);
      setWonTheGame(false);
      setShowModalResult(true);
      setOpenModalClass("modal-blur");
      apiRank.post("/new", {
        nick: nickPlayer,
        gamePoints: calculatePoints(false),
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

  const calculatePoints = (win: boolean) => {
    const points = Number(localStorage.getItem("points"));
    if (win) {
      const total = (championName.length - missedLetters.length + 6) * 10;
      setPlusPoints(total);
      return total + points;
    } else {
      return points - 100;
    }
  };

  const handleOpenCredits = () => {
    setShowModalCredits(!showModalCredits);
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

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  useEffect(() => {
    handleGetTitle(championName);
    handleGetSplash(championName);
  }, [championName]);

  return (
    <div className="msl:w-11/12">
      <div className="flex justify-center">
        <ModalEnterNick
          show={showModalNick}
          onDisabled={nickPlayer ? false : true}
          handleOnChange={(event: any) => setNickPlayer(event.target.value)}
          handleStartGame={handleStartGame}
        />
        <ModalResult
          show={showModalResult}
          closeModal={handleCloseModal}
          splash={splashImg}
          championName={
            championName.toLocaleLowerCase().charAt(0).toUpperCase() +
            championName.slice(1)
          }
          championTitle={championTitle}
          isWinner={wonTheGame}
          plusPoints={plusPoints}
        />
      </div>
      <div
        className={`max-w-3xl flex flex-col gap-8 my-0 mx-auto items-center mt-5 first-blur ${openModalClass}`}
      >
        <img
          src={logo}
          alt="logotipo"
          className="absolute left-3 top-2 w-64 msl:w-40"
        />
        <button
          className="absolute right-5 top-5 cursor-pointer focus:outline-none"
          disabled={showModalNick}
          onClick={toggleModalRanking}
        >
          <img src={rankingIcon} alt="ranking icon" />
        </button>

        <div className={`${showModalNick ? "invisible" : ""}`}>
          <HangmanDraw guesses={missedLetters.length} />
        </div>
        {!showModalResult && (
          <>
            <HangmanName
              reveal={isLoser}
              guessedLetters={guessedLetters}
              nameToGuess={championName.toLocaleLowerCase()}
            />
            <div className="self-stretch">
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
        <Footer />
        <ModalCredits show={showModalCredits} />
        <button
          className="absolute right-3 bottom-3 cursor-pointer focus:outline-none msl:w-8"
          onClick={handleOpenCredits}
        >
          <img src={copyright} alt="copyright" />
        </button>
      </div>
    </div>
  );
}

export default App;
