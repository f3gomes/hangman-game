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
    // <div
    //   className={cn(
    //     show ? "flex" : "hidden",
    //     "bg-902 absolute left-1/2 -ml-48 flex-col gap-3 justify-center items-center bottom-2/4 w-96 h-40 rounded-2xl"
    //   )}
    // >
    //   <p className="text-903 text-2xl font-bold">Digite seu nick</p>
    //   <input
    //     type="text"
    //     className="w-9/12 h-9 rounded-lg text-903 text-center font-bold text-xl"
    //     onChange={handleOnChange}
    //   />
    //   <button
    //     disabled={onDisabled}
    //     onClick={handleStartGame}
    //     className="font-bold text-xl text-904 px-4 cursor-pointer disabled:opacity-30 rounded-lg border-902 border hover:border-slate-950 hover:border"
    //   >
    //     Iniciar
    //   </button>
    // </div>

    <div
      role="dialog"
      aria-modal="true"
      className={cn(
        show ? "flex" : "hidden",
        "fixed inset-0 z-10 overflow-y-auto justify-center items-center"
      )}
      aria-labelledby="modal-title"
    >
      <div className="px-4 pt-5 pb-4 bg-902 sm:p-6 sm:pb-4 rounded-lg shadow-xl w-72">
        <h3
          className="text-lg font-medium leading-6 text-gray-900"
          id="modal-title"
        >
          Digite seu nick
        </h3>
        <div className="mt-4">
          <form onSubmit={handleStartGame} className="space-y-4" autoComplete="off">
            <input
              required
              type="text"
              id="nickname"
              placeholder="Seu nickname"
              onChange={handleOnChange}
              className="block w-full px-3 py-2 placeholder-gray-400 text-slate-700 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={onDisabled}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:hover:bg-indigo-600 disabled:opacity-40"
              >
                Iniciar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
