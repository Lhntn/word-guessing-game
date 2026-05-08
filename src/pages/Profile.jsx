import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FiUser, FiMail, FiEdit2, FiSave } from 'react-icons/fi';

export default function Profile() {
  const { currentUser, userProfile, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(userProfile?.displayName || '');
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSave = async () => {
    const result = await updateUserProfile({ displayName });
    if (result.success) {
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } else {
      setMessage({ type: 'error', text: result.error });
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">
          <div className="avatar-placeholder">
            {userProfile?.displayName?.charAt(0)?.toUpperCase() || currentUser?.email?.charAt(0)?.toUpperCase()}
          </div>
        </div>
        
        <div className="profile-info">
          <div className="info-row">
            <FiMail className="info-icon" />
            <div>
              <label>Email Address</label>
              <p>{currentUser?.email}</p>
            </div>
          </div>
          
          <div className="info-row">
            <FiUser className="info-icon" />
            <div>
              <label>Display Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="edit-input"
                />
              ) : (
                <p>{userProfile?.displayName || currentUser?.email?.split('@')[0]}</p>
              )}
            </div>
          </div>
        </div>

        {message.text && (
          <div className={`profile-message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="profile-actions">
          {isEditing ? (
            <button onClick={handleSave} className="btn-primary">
              <FiSave /> Save Changes
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="btn-secondary">
              <FiEdit2 /> Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="stats-card">
        <h3>Game Statistics</h3>
        <p>Track your progress and achievements</p>
        <div className="stats-placeholder">
          <div className="stat-item">
            <span className="stat-value">--</span>
            <span className="stat-label">Words Solved</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">--</span>
            <span className="stat-label">Total Points</span>
          </div>
        </div>
      </div>
    </div>
  );
}