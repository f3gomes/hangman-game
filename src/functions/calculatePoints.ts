export const calculatePoints = (
  win: boolean,
  championName: string,
  missedLetters: string[],
  setPlusPoints: (total: number) => void
) => {
  const points = Number(localStorage.getItem("points"));
  if (win) {
    const total = (championName.length - missedLetters.length + 6) * 10;
    setPlusPoints(total);
    return total + points;
  } else {
    return points - 100;
  }
};
