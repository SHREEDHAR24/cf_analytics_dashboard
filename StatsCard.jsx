const StatsCard = ({ title, value, subtitle, trend }) => {
  const trendColor = trend > 0 ? '#22c55e' : trend < 0 ? '#ef4444' : '#6b7280';
  const trendIcon = trend > 0 ? '↑' : trend < 0 ? '↓' : '→';

  return (
    <div className="card stats-card">
      <h3 className="stats-title">{title}</h3>
      <div className="stats-value">{value}</div>
      {subtitle && <p className="stats-subtitle">{subtitle}</p>}
      {trend !== undefined && (
        <span className="stats-trend" style={{ color: trendColor }}>
          {trendIcon} {Math.abs(trend)}
        </span>
      )}
    </div>
  );
};

export default StatsCard;
