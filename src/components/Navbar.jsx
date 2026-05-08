import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { FiSun, FiMoon, FiUser, FiHome, FiPlay, FiAward, FiSettings, FiLogOut } from 'react-icons/fi';

export default function Navbar() {
  const { currentUser, signOut } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">LexiQuest</Link>
      </div>
      <div className="nav-links">
        <Link to="/"><FiHome /> Home</Link>
        {currentUser && (
          <>
            <Link to="/play"><FiPlay /> Play</Link>
            <Link to="/scores"><FiAward /> Leaderboard</Link>
            <Link to="/profile"><FiUser /> Profile</Link>
            <Link to="/settings"><FiSettings /> Settings</Link>
          </>
        )}
        {!currentUser ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-btn">
            <FiLogOut /> Logout
          </button>
        )}
        <button onClick={toggleDarkMode} className="theme-toggle">
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>
    </nav>
  );
}