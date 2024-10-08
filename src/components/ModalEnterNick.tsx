import cn from "../functions/cn";

interface ModalNickProps {
  show: boolean;
  onDisabled: boolean;
  handleOnChange: any;
  handleStartGame: any;
}

export default function ModalEnterNick({
  show,
  onDisabled,
  handleOnChange,
  handleStartGame,
}: ModalNickProps) {
  return (
    <div
      className={cn(
        show ? "flex" : "hidden",
        "bg-902 absolute left-1/2 -ml-48 flex-col justify-center items-center bottom-2/4 w-96 h-40 rounded-3xl"
      )}
    >
      <p className="text-903 text-2xl font-bold uppercase">Digite seu nick</p>
      <input
        type="text"
        className="w-9/12 h-9 rounded-xl text-903 text-center font-bold"
        onChange={handleOnChange}
      />
      <button
        className="mt-4 font-bold text-xl text-904 cursor-pointer disabled:opacity-30"
        onClick={handleStartGame}
        disabled={onDisabled}
      >
        Iniciar
      </button>
    </div>
  );
}
