import correct from "../assets/corrent_answer.png";
import wrong from "../assets/wrong_answer.png";
import hangman from "../assets/hangman_mini.png";
import cn from "../functions/cn";

interface ModalHelpProps {
  show: boolean;
}

export default function ModalHelp({ show }: ModalHelpProps) {
  const letterArr = ["A", "", "A", "", ""];

  return (
    <div
      className={cn(
        show ? "flex" : "hidden",
        "absolute top-2 bg-905 h-914 w-911 left-1/2 -ml-[283.5px] text-center rounded-4xl z-10 flex-col items-center justify-between p-3 tall:h-full msl:w-11/12 msl:h-913 msl:ml-9 msl:rounded-3xl msl:p-2 msl:mr-8 transition-all duration-300"
      )}
    >
      <p className="text-lg">
        <span className="text-3xl msl:text-2xl block">Ajuda</span>
        Advinhe o campeão de League of Legends da vez.
      </p>
      <hr className="bg-white w-11/12" />

      <p className="text-lg">
        <span className="text-3xl msl:text-2xl block">Como funciona?</span>
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

      <p className="text-lg msl:text-base">
        Acertou o campeão? Você receberá uma pontuação baseada <br /> na
        quantidade de letras acertadas (não repetidas), subtraindo <br /> as
        letras que você errar.
      </p>

      <img
        src={correct}
        alt="modal correto"
        className="w-6/12 msl:w-64 tall:w-4/12"
      />

      <p className="text-lg msl:text-base">
        Se errar a letra, aparecerá uma parte do corpo na Forca <br /> e{" "}
        <span className="text-907">serão subtraídos 10 pontos</span> na
        pontuação do <span className="text-904">acerto</span>
      </p>

      <img
        src={hangman}
        alt="hangman"
        className="w-2/12 msl:w-16 tall:w-1/12 mxl2:w-1/12"
      />

      <p className="text-lg msl:text-base">
        Errou o campeão? A forca estará completa e você perde <br />
        <span className="text-907">100 pontos</span>!
      </p>

      <img
        src={wrong}
        alt="modal errado"
        className="w-6/12 msl:w-64 tall:w-4/12"
      />
    </div>
  );
}
