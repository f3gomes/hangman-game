import React from "react";
import correct from "../assets/corrent_answer.png";
import wrong from "../assets/wrong_answer.png";
import hangman from "../assets/hangman_mini.png";

interface ModalHelpProps {
  show: boolean;
}

export default function ModalHelp({ show }: ModalHelpProps) {
  const letterArr = ["A", "", "A", "", ""];

  return (
    <div
      className={`${
        show ? "" : "hidden"
      } absolute top-3 bg-905 h-912 w-911 text-center rounded-4xl z-10 flex flex-col items-center justify-between p-4 msl:w-11/12 msl:h-913 msl:ml-9 msl:rounded-3xl`}
    >
      <h1 className="text-4xl msl:text-2xl">Ajuda</h1>
      <p className="text-lg">Advinhe o campeão de League of Legends da vez.</p>
      <hr className="bg-white w-11/12" />

      <h1 className="text-4xl msl:text-2xl">Como funciona?</h1>
      <p className="text-lg">
        Clique em uma letra aleatória do teclado. <br /> Se acertar, a letra
        aparecerá na tela e você não perderá pontos.{" "}
      </p>

      <div className="flex">
        {letterArr.map((item: any, index: number) => {
          if (item === "A") {
            return (
              <span className="border-b-4 w-6 ml-3" key={index}>
                <span className="text-3xl">A</span>
              </span>
            );
          } else {
            return (
              <span className="border-b-4 w-6 ml-3" key={index}>
                <span className="text-905">___</span>
              </span>
            );
          }
        })}
      </div>

      <p className="text-lg">
        Acertou o campeão? Você receberá uma pontuação baseada <br /> na
        quantidade de letras acertadas (não repetidas), subtraindo <br /> as
        letras que você errar.
      </p>

      <img src={correct} alt="modal correto" className="msl:w-64" />

      <p className="text-lg msl:text-base">
        Se errar a letra, aparecerá uma parte do corpo na Forca <br /> e{" "}
        <span className="text-907">serão subtraídos 10 pontos</span> na
        pontuação do <span className="text-904">acerto</span>
      </p>

      <img src={hangman} alt="hangman" className="msl:w-16" />

      <p className="text-lg msl:text-base">
        Errou o campeão? A forca estará completa e você perde <br />
        <span className="text-907">100 pontos</span>!
      </p>

      <img src={wrong} alt="modal errado" className="msl:w-64" />
    </div>
  );
}
