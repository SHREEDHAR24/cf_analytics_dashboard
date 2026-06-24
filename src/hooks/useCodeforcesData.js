import { useState, useEffect, useCallback } from 'react';
import { getUserInfo, getRatingHistory, getSubmissions } from '../api/codeforces';
import {
  calculateSolvedProblems,
  calculateAverageRatingGain,
  getTagFrequency,
  getDifficultyDistribution,
  predictNextRating,
} from '../utils/analytics';

const useCodeforcesData = (handle) => {
  const [data, setData] = useState({
    userInfo: null,
    ratingHistory: [],
    submissions: [],
    analytics: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!handle.trim()) return;
    
    setLoading(true);
    setError(null);

    try {
      // Fetch all data in parallel
      const [userInfo, ratingHistory, submissions] = await Promise.all([
        getUserInfo(handle),
        getRatingHistory(handle),
        getSubmissions(handle),
      ]);

      // Compute analytics
      const analytics = {
        totalSolved: calculateSolvedProblems(submissions),
        averageRatingGain: calculateAverageRatingGain(ratingHistory),
        tagFrequency: getTagFrequency(submissions),
        difficultyDistribution: getDifficultyDistribution(submissions),
        predictedRating: predictNextRating(ratingHistory),
        contestCount: ratingHistory.length,
      };

      setData({ userInfo, ratingHistory, submissions, analytics });
    } catch (err) {
      const message = err.response?.data?.comment || err.message || 'Failed to fetch data';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [handle]);

  return { data, loading, error, fetchData };
};

export default useCodeforcesData;
