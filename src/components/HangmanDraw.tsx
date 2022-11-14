import React from "react";

const head = () => {
  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "100%",
        border: "10px solid white",
        position: "absolute",
        top: "31px",
        right: "-20px",
      }}
    ></div>
  );
};

const body = () => {
  return (
    <div
      style={{
        width: "10px",
        height: "100px",
        background: "white",
        position: "absolute",
        top: "80px",
        right: 0,
      }}
    ></div>
  );
};

const rightArm = () => {
  return (
    <div
      style={{
        width: "80px",
        height: "10px",
        background: "white",
        position: "absolute",
        top: "110px",
        right: "-80px",
      }}
    ></div>
  );
};

const leftArm = () => {
  return (
    <div
      style={{
        width: "80px",
        height: "10px",
        background: "white",
        position: "absolute",
        top: "110px",
        right: "10px",
      }}
    ></div>
  );
};

const rightLeg = () => {
  return (
    <div
      style={{
        width: "100px",
        height: "10px",
        background: "white",
        position: "absolute",
        top: "170px",
        right: "-90px",
        rotate: "60deg",
        transformOrigin: "left bottom",
      }}
    ></div>
  );
};

const leftLeg = () => {
  return (
    <div
      style={{
        width: "100px",
        height: "10px",
        background: "white",
        position: "absolute",
        top: "170px",
        right: 0,
        rotate: "-60deg",
        transformOrigin: "right bottom",
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
    <div className="relative mb-48 mxl:mb-16 mxl2:mb-4 mxl3:mb-48 msl:mt-14 msl:mr-28">
      {Array.from(bodyParts).slice(0, guesses)}
      <div className="bg-903 absolute h-8 w-2 right-0"></div>
      <div className="bg-903 h-2 w-52 ml-32"></div>
      <div className="bg-903 h-80 w-2 ml-32 mxl:h-64"></div>
      <div className="bg-903 h-2 w-36 ml-16"></div>
    </div>
  );
}
