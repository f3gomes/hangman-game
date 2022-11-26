import React from "react";
interface HangmanNameProps {
  reveal?: boolean;
  guessedLetters: string[];
  nameToGuess: string;
}

export default function HangmanName({
  guessedLetters,
  nameToGuess,
  reveal = false,
}: HangmanNameProps) {
  return (
    <div className="flex gap-1 text-6xl font-bold uppercase justify-center msl:-mt-48 mxl:-mt-16 mxl3:-mt-32">
      {nameToGuess.split("").map((letter, index) => (
        <span
          key={index}
          className="border-b-8 w-14 ml-4 msl:w-6 msl:border-b-4"
        >
          <span
            className="font-resp mxl3:text-7xl"
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
