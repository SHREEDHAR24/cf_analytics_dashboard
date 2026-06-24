import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const getDifficultyColor = (range) => {
  const rating = parseInt(range);
  if (rating >= 2400) return '#FF0000';
  if (rating >= 2100) return '#FF8C00';
  if (rating >= 1900) return '#AA00AA';
  if (rating >= 1600) return '#0000FF';
  if (rating >= 1400) return '#03A89E';
  if (rating >= 1200) return '#008000';
  return '#808080';
};

const DifficultyChart = ({ difficultyData }) => {
  if (!difficultyData?.length) {
    return <div className="card">No difficulty data available</div>;
  }

  return (
    <div className="card chart-card">
      <h3>Difficulty Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={difficultyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="range" tick={{ fontSize: 11 }} stroke="#9ca3af" />
          <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
            }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {difficultyData.map((entry) => (
              <Cell key={entry.range} fill={getDifficultyColor(entry.range)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DifficultyChart;
