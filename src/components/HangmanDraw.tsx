import React from "react";

const head = () => {
  return (
    <div
      key={1}
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
      key={2}
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
      key={3}
      style={{
        width: "70px",
        height: "10px",
        background: "white",
        position: "absolute",
        top: "93px",
        right: "-63px",
        rotate: "40deg",
        transformOrigin: "left bottom",
      }}
    ></div>
  );
};

const leftArm = () => {
  return (
    <div
      key={4}
      style={{
        width: "70px",
        height: "10px",
        background: "white",
        position: "absolute",
        top: "90px",
        right: "0px",
        rotate: "-40deg",
        transformOrigin: "right bottom",
      }}
    ></div>
  );
};

const rightLeg = () => {
  return (
    <div
      key={5}
      style={{
        width: "80px",
        height: "10px",
        background: "white",
        position: "absolute",
        top: "170px",
        right: "-70px",
        rotate: "60deg",
        transformOrigin: "left bottom",
      }}
    ></div>
  );
};

const leftLeg = () => {
  return (
    <div
      key={6}
      style={{
        width: "80px",
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
    <div className="relative mt-10 mb-44 mxl:mb-16 mxl3:mb-48 msl:mt-28 msl:mr-40">
      {Array.from(bodyParts).slice(0, guesses)}
      <div className="bg-903 absolute h-8 w-2 right-0"></div>
      <div className="bg-903 h-2 w-52 ml-32"></div>
      <div className="bg-903 h-72 w-2 ml-32 mxl:h-64 msl:h-64"></div>
      <div className="bg-903 h-2 w-16 ml-24"></div>
    </div>
  );
}
