/**
 * Calculate total unique solved problems
 */
export const calculateSolvedProblems = (submissions) => {
  const solved = new Set();
  
  submissions.forEach((sub) => {
    if (sub.verdict === 'OK') {
      const problemId = `${sub.problem.contestId}-${sub.problem.index}`;
      solved.add(problemId);
    }
  });
  
  return solved.size;
};

/**
 * Calculate average rating change per contest
 */
export const calculateAverageRatingGain = (ratingHistory) => {
  if (ratingHistory.length < 2) return 0;
  
  const changes = ratingHistory.map((contest, i) => {
    if (i === 0) return 0;
    return contest.newRating - ratingHistory[i - 1].newRating;
  }).slice(1);
  
  const sum = changes.reduce((a, b) => a + b, 0);
  return Math.round(sum / changes.length);
};

/**
 * Get tag frequency from solved problems
 */
export const getTagFrequency = (submissions) => {
  const tagCount = {};
  const solved = new Set();
  
  submissions.forEach((sub) => {
    if (sub.verdict === 'OK') {
      const problemId = `${sub.problem.contestId}-${sub.problem.index}`;
      if (!solved.has(problemId)) {
        solved.add(problemId);
        sub.problem.tags?.forEach((tag) => {
          tagCount[tag] = (tagCount[tag] || 0) + 1;
        });
      }
    }
  });
  
  return Object.entries(tagCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
};

/**
 * Get difficulty distribution of solved problems
 */
export const getDifficultyDistribution = (submissions) => {
  const diffCount = {};
  const solved = new Set();
  
  submissions.forEach((sub) => {
    if (sub.verdict === 'OK' && sub.problem.rating) {
      const problemId = `${sub.problem.contestId}-${sub.problem.index}`;
      if (!solved.has(problemId)) {
        solved.add(problemId);
        const rating = sub.problem.rating;
        const bucket = Math.floor(rating / 200) * 200;
        const label = `${bucket}-${bucket + 199}`;
        diffCount[label] = (diffCount[label] || 0) + 1;
      }
    }
  });
  
  return Object.entries(diffCount)
    .map(([range, count]) => ({ range, count }))
    .sort((a, b) => parseInt(a.range) - parseInt(b.range));
};

/**
 * Simple next rating prediction using linear regression
 */
export const predictNextRating = (ratingHistory) => {
  if (ratingHistory.length < 3) {
    return ratingHistory.length > 0 
      ? ratingHistory[ratingHistory.length - 1].newRating 
      : 1200;
  }
  
  // Use last 10 contests for prediction
  const recent = ratingHistory.slice(-10);
  const n = recent.length;
  
  // Simple linear regression
  let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
  
  recent.forEach((contest, i) => {
    sumX += i;
    sumY += contest.newRating;
    sumXY += i * contest.newRating;
    sumXX += i * i;
  });
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  
  const predicted = Math.round(intercept + slope * n);
  const currentRating = recent[recent.length - 1].newRating;
  
  // Clamp prediction to reasonable bounds
  return Math.max(
    currentRating - 200,
    Math.min(currentRating + 200, predicted)
  );
};

/**
 * Get rating rank title
 */
export const getRankTitle = (rating) => {
  if (rating >= 3000) return { title: 'Legendary Grandmaster', color: '#FF0000' };
  if (rating >= 2600) return { title: 'International Grandmaster', color: '#FF0000' };
  if (rating >= 2400) return { title: 'Grandmaster', color: '#FF0000' };
  if (rating >= 2300) return { title: 'International Master', color: '#FF8C00' };
  if (rating >= 2100) return { title: 'Master', color: '#FF8C00' };
  if (rating >= 1900) return { title: 'Candidate Master', color: '#AA00AA' };
  if (rating >= 1600) return { title: 'Expert', color: '#0000FF' };
  if (rating >= 1400) return { title: 'Specialist', color: '#03A89E' };
  if (rating >= 1200) return { title: 'Pupil', color: '#008000' };
  return { title: 'Newbie', color: '#808080' };
};
