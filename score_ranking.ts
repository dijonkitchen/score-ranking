function newPoints(results: any) {
  const [team1, team2] = Object.keys(results);
  const team1score = results[team1];
  const team2score = results[team2];
  const tiePoints = 1;
  const winningPoints = 3;
  const losingPoints = 0;

  if (team1score === team2score) {
    return { [team1]: tiePoints, [team2]: tiePoints };
  } else if (team1score < team2score) {
    return { [team1]: losingPoints, [team2]: winningPoints };
  } else {
    return { [team1]: winningPoints, [team2]: losingPoints };
  }
}

function addPoints(points: any, score: string) {
  const results = score.split(", ");
  let comparison: any = {};
  results.map((result) => {
    const calculation = result.split(" ");
    const teamPointsString = calculation[calculation.length - 1];
    const teamPointsNumber = parseInt(teamPointsString, 10);
    const teamName: string = result.slice(
      0,
      result.indexOf(teamPointsString) - 1,
    );
    comparison[teamName] = teamPointsNumber;
  });

  const newTeamPoints = newPoints(comparison);
  for (const team in newTeamPoints) {
    points[team] = (points[team] || 0) + newTeamPoints[team];
  }
  return points;
}

function scoreComparator(a: [string, number], b: [string, number]) {
  const scoreComparison = b[1] - a[1];
  if (scoreComparison === 0) {
    if (b[0] < a[0]) {
      return 1;
    } else {
      return -1;
    }
  } else {
    return scoreComparison;
  }
}

function buildScores(sortedScores: [[string, number]]) {
  let ranking = 1;
  let skips = 0;
  const scores = sortedScores.map(
    ([name, score]: [string, number], index: number) => {
      const isSinglePoint = score === 1;
      const previousTeam = sortedScores[index - 1];
      if (previousTeam && previousTeam[1]) {
        if (previousTeam[1] !== score) {
          ranking = ranking + skips + 1;
          skips = 0;
        } else {
          skips += 1;
        }
      }
      return `${ranking}. ${name}, ${score} ${isSinglePoint ? "pt" : "pts"}`;
    },
  );

  return scores;
}

function buildRanking(points: any) {
  const teamsAndPoints: any = [];
  for (const team in points) {
    teamsAndPoints.push([team, points[team]]);
  }
  const sortedScores = teamsAndPoints.sort(scoreComparator);
  const scores = buildScores(sortedScores);

  return scores.join("\n").concat("\n");
}

function scoreRanking(data: string) {
  const lines = data.split("\n");
  let points = {};
  lines.forEach((score: string) => addPoints(points, score));
  return buildRanking(points);
}

export { scoreRanking };
