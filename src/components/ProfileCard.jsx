import { getRankTitle } from '../utils/analytics';

const ProfileCard = ({ userInfo }) => {
  if (!userInfo) return null;

  const { title, color } = getRankTitle(userInfo.rating || 0);

  return (
    <div className="card profile-card">
      <div className="profile-header">
        <img
          src={userInfo.titlePhoto}
          alt={userInfo.handle}
          className="profile-avatar"
        />
        <div className="profile-info">
          <h2 style={{ color }}>{userInfo.handle}</h2>
          <span className="rank-badge" style={{ backgroundColor: color }}>
            {title}
          </span>
        </div>
      </div>
      
      <div className="profile-stats">
        <div className="stat-item">
          <span className="stat-value" style={{ color }}>
            {userInfo.rating || 'Unrated'}
          </span>
          <span className="stat-label">Current Rating</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{userInfo.maxRating || 'N/A'}</span>
          <span className="stat-label">Max Rating</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{userInfo.friendOfCount || 0}</span>
          <span className="stat-label">Friends</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
