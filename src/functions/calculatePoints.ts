function countDuplicateChar(text: any) {
  text = [...text.toLowerCase()];
  var counts: any = {};
  let tally = 0;
  text.forEach((x: any) => {
    counts[x] = (counts[x] || 0) + 1;
  });
  for (let count in counts) {
    if (counts[count] > 1) tally++;
  }
  return tally;
}

export const calculatePoints = (
  win: boolean,
  championName: string,
  missedLetters: string[],
  setPlusPoints: (total: number) => void
) => {
  const points = Number(localStorage.getItem("points"));
  if (win) {
    const total =
      (championName.length -
        countDuplicateChar(championName) -
        missedLetters.length +
        6) *
      10;
    setPlusPoints(total);
    return total + points;
  } else {
    return points - 100;
  }
};
