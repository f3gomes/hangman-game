interface HangmanNameProps {
  reveal?: boolean;
  guessedLetters: string[];
  nameToGuess: string | null;
}

export default function HangmanName({
  nameToGuess,
  guessedLetters,
  reveal = false,
}: HangmanNameProps) {
  return (
    <div className="flex justify-center gap-1 text-6xl font-bold uppercase flex-wrap w-11/12">
      {nameToGuess?.split("").map((letter, index) => (
        <span
          key={index}
          className="flex justify-center border-b-8 w-14 ml-4 msl:w-6 msl:border-b-4"
        >
          <span
            className="text-7xl msl:text-4xl"
            style={{
              visibility:
                guessedLetters.includes(letter) || reveal
                  ? "visible"
                  : "hidden",
              color: !guessedLetters.includes(letter) && reveal ? "red" : "",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
}
