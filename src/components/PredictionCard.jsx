import { getRankTitle } from '../utils/analytics';

const PredictionCard = ({ currentRating, predictedRating }) => {
  const current = getRankTitle(currentRating);
  const predicted = getRankTitle(predictedRating);
  const diff = predictedRating - currentRating;

  return (
    <div className="card prediction-card">
      <h3>Next Rating Prediction</h3>
      <p className="prediction-subtitle">Based on recent performance trend</p>
      
      <div className="prediction-display">
        <div className="prediction-current">
          <span className="prediction-label">Current</span>
          <span className="prediction-value" style={{ color: current.color }}>
            {currentRating}
          </span>
        </div>
        
        <div className="prediction-arrow">
          {diff >= 0 ? '→' : '→'}
        </div>
        
        <div className="prediction-next">
          <span className="prediction-label">Predicted</span>
          <span className="prediction-value" style={{ color: predicted.color }}>
            {predictedRating}
          </span>
        </div>
      </div>
      
      <div
        className="prediction-change"
        style={{ color: diff >= 0 ? '#22c55e' : '#ef4444' }}
      >
        {diff >= 0 ? '+' : ''}{diff} expected change
      </div>
      
      <p className="prediction-note">
        * Simple linear regression on last 10 contests
      </p>
    </div>
  );
};

export default PredictionCard;
