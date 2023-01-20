import React from "react";

const head = () => {
  return (
    <div
      key={1}
      style={{
        width: "70px",
        height: "70px",
        borderRadius: "100%",
        border: "10px solid white",
        position: "absolute",
        top: "27px",
        right: "-30px",
      }}
    ></div>
  );
};

const body = () => {
  return (
    <div
      key={2}
      style={{
        width: "10px",
        height: "90px",
        background: "white",
        position: "absolute",
        top: "90px",
        right: 0,
        borderRadius: "8px",
      }}
    ></div>
  );
};

const rightArm = () => {
  return (
    <div
      key={3}
      style={{
        width: "60px",
        height: "10px",
        background: "white",
        position: "absolute",
        top: "105px",
        right: "-54px",
        rotate: "20deg",
        transformOrigin: "left bottom",
        borderRadius: "8px",
      }}
    ></div>
  );
};

const leftArm = () => {
  return (
    <div
      key={4}
      style={{
        width: "60px",
        height: "10px",
        background: "white",
        position: "absolute",
        top: "105px",
        right: "-0px",
        rotate: "-20deg",
        transformOrigin: "right bottom",
        borderRadius: "8px",
      }}
    ></div>
  );
};

const rightLeg = () => {
  return (
    <div
      key={5}
      style={{
        width: "60px",
        height: "10px",
        background: "white",
        position: "absolute",
        top: "167px",
        right: "-50px",
        rotate: "50deg",
        transformOrigin: "left bottom",
        borderRadius: "8px",
      }}
    ></div>
  );
};

const leftLeg = () => {
  return (
    <div
      key={6}
      style={{
        width: "60px",
        height: "10px",
        background: "white",
        position: "absolute",
        top: "167px",
        right: 0,
        rotate: "-50deg",
        transformOrigin: "right bottom",
        borderRadius: "8px",
      }}
    ></div>
  );
};

interface HangmanDrawProps {
  guesses: number;
}

const bodyParts = [
  head(),
  body(),
  rightArm(),
  leftArm(),
  rightLeg(),
  leftLeg(),
];

export default function HangmanDraw({ guesses }: HangmanDrawProps) {
  return (
    <div className="relative mt-20 -ml-24">
      {Array.from(bodyParts).slice(0, guesses)}
      <div className="bg-white absolute h-8 w-2 right-0 rounded-lg"></div>
      <div className="bg-white h-2 w-44 ml-32"></div>
      <div className="bg-white h-2 w-24 ml-29 top-8 rounded-lg absolute -rotate-45 msl:ml-30"></div>
      <div className="bg-white h-72 w-2 ml-32"></div>
      <div className="bg-white h-2 w-20 ml-24 rounded-lg"></div>
    </div>
  );
}
