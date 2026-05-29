export type EloResult = {
  newRatingA: number;
  newRatingB: number;
  changeA: number;
  changeB: number;
};

function getKFactor(rating: number, gamesPlayed: number): number {
  if (gamesPlayed < 30) return 32;
  if (rating < 2100) return 24;
  return 16;
}

export function calculateElo(
  ratingA: number,
  ratingB: number,
  gamesPlayedA: number,
  gamesPlayedB: number,
  winner: "a" | "b" | "draw"
): EloResult {
  const kA = getKFactor(ratingA, gamesPlayedA);
  const kB = getKFactor(ratingB, gamesPlayedB);

  // Expected scores
  const expectedA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
  const expectedB = 1 / (1 + Math.pow(10, (ratingA - ratingB) / 400));

  // Actual scores
  let actualA = 0.5;
  let actualB = 0.5;

  if (winner === "a") {
    actualA = 1;
    actualB = 0;
  } else if (winner === "b") {
    actualA = 0;
    actualB = 1;
  }

  // New ratings
  const newRatingA = Math.round(ratingA + kA * (actualA - expectedA));
  const newRatingB = Math.round(ratingB + kB * (actualB - expectedB));

  return {
    newRatingA,
    newRatingB,
    changeA: newRatingA - ratingA,
    changeB: newRatingB - ratingB,
  };
}
