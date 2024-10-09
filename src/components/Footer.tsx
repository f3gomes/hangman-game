import copyright from "../assets/copyright.svg";
import tips from "../assets/btn_tip.svg";
import cn from "../functions/cn";

export default function Footer({
  show,
  handleOpenHelp,
  handleOpenCredits,
}: any) {
  return (
    <footer className={cn(show ? "w-full flex justify-center" : "hidden")}>
      <div className="text-slate-300 fixed bottom-1 w-full text-sm text-center msl:text-xs msl:w-9/12 tall:hidden">
        Todos os direitos de “
        <a
          href="https://www.leagueoflegends.com/pt-br/"
          className="transition hover:brightness-125"
          target={"_blank"}
        >
          League of Legends
        </a>
        ” e seus atributos são reservados à{" "}
        <a
          href="https://www.riotgames.com/pt-br"
          className="transition hover:brightness-125"
          target={"_blank"}
        >
          Riot Games
        </a>{" "}
        , Inc.
      </div>

      <button
        onClick={handleOpenCredits}
        className="fixed bottom-3 right-3 cursor-pointer transition hover:brightness-125 focus:outline-none msl:w-8"
      >
        <img src={copyright} alt="copyright" />
      </button>

      <button
        onClick={handleOpenHelp}
        className="fixed bottom-3 right-20 cursor-pointer transition hover:brightness-125 focus:outline-none msl:w-8 msl:left-3"
      >
        <img src={tips} alt="copyright" />
      </button>
    </footer>
  );
}
