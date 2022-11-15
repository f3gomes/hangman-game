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
    <div className="flex gap-1 text-6xl font-bold uppercase msl:-mt-52 msl:text-xl msl:w-full msl:gap-0 msl:justify-center">
      {nameToGuess.split("").map((letter, index) => (
        <span key={index} className="border-b-8 w-14 ml-4 msl:w-6 msl:border-b-4">
          <span
            className="ml-2"
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
