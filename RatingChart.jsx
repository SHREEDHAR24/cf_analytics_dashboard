import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

const RatingChart = ({ ratingHistory }) => {
  if (!ratingHistory?.length) {
    return <div className="card">No rating history available</div>;
  }

  const chartData = ratingHistory.map((contest) => ({
    name: contest.contestName.slice(0, 20),
    rating: contest.newRating,
    date: new Date(contest.ratingUpdateTimeSeconds * 1000).toLocaleDateString(),
  }));

  // Rating tier lines
  const tiers = [
    { rating: 1200, color: '#008000' },
    { rating: 1400, color: '#03A89E' },
    { rating: 1600, color: '#0000FF' },
    { rating: 1900, color: '#AA00AA' },
    { rating: 2100, color: '#FF8C00' },
    { rating: 2400, color: '#FF0000' },
  ];

  return (
    <div className="card chart-card">
      <h3>Rating Progression</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <YAxis domain={['auto', 'auto']} tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
            }}
          />
          {tiers.map((tier) => (
            <ReferenceLine
              key={tier.rating}
              y={tier.rating}
              stroke={tier.color}
              strokeDasharray="5 5"
              strokeOpacity={0.5}
            />
          ))}
          <Line
            type="monotone"
            dataKey="rating"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ fill: '#6366f1', strokeWidth: 2, r: 3 }}
            activeDot={{ r: 6, fill: '#818cf8' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingChart;
