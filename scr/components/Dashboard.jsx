import { useState, useEffect } from 'react';
import useCodeforcesData from '../hooks/useCodeforcesData';
import ProfileCard from './ProfileCard';
import StatsCard from './StatsCard';
import RatingChart from './RatingChart';
import TagChart from './TagChart';
import DifficultyChart from './DifficultyChart';
import PredictionCard from './PredictionCard';

const Dashboard = () => {
  const [handle, setHandle] = useState('');
  const [searchHandle, setSearchHandle] = useState('');
  const { data, loading, error, fetchData } = useCodeforcesData(searchHandle);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchHandle(handle);
  };

  // Trigger fetch when searchHandle changes
  useEffect(() => {
    if (searchHandle) {
      fetchData();
    }
  }, [searchHandle, fetchData]);

  const { userInfo, ratingHistory, analytics } = data;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>⚡ Codeforces Analytics</h1>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="Enter Codeforces handle..."
            className="search-input"
          />
          <button type="submit" disabled={loading} className="search-button">
            {loading ? 'Loading...' : 'Analyze'}
          </button>
        </form>
      </header>

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Fetching data from Codeforces...</p>
        </div>
      )}

      {userInfo && analytics && !loading && (
        <div className="dashboard-content">
          <div className="dashboard-grid">
            <ProfileCard userInfo={userInfo} />
            
            <StatsCard
              title="Problems Solved"
              value={analytics.totalSolved}
              subtitle="Unique problems"
            />
            
            <StatsCard
              title="Contests Participated"
              value={analytics.contestCount}
              subtitle="Rated contests"
            />
            
            <StatsCard
              title="Avg Rating Change"
              value={analytics.averageRatingGain}
              subtitle="Per contest"
              trend={analytics.averageRatingGain}
            />
          </div>

          <div className="charts-grid">
            <RatingChart ratingHistory={ratingHistory} />
            
            <PredictionCard
              currentRating={userInfo.rating}
              predictedRating={analytics.predictedRating}
            />
          </div>

          <div className="charts-grid">
            <TagChart tagData={analytics.tagFrequency} />
            <DifficultyChart difficultyData={analytics.difficultyDistribution} />
          </div>
        </div>
      )}

      {!userInfo && !loading && !error && (
        <div className="empty-state">
          <p>Enter a Codeforces handle to view analytics</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
