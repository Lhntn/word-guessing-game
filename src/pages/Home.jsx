import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiPlay, FiAward, FiUser, FiLogIn } from 'react-icons/fi';

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>LexiQuest</h1>
        <p className="tagline">Challenge Your Vocabulary. Conquer the Word Ladder.</p>
        <p className="description">
          Guess hidden words using intelligent hints, earn points, and compete on the global leaderboard.
          Each correct guess rewards you with points based on difficulty and remaining attempts.
        </p>
        {!currentUser ? (
          <div className="cta-buttons">
            <Link to="/register" className="btn-primary">Get Started</Link>
            <Link to="/login" className="btn-secondary">Login</Link>
          </div>
        ) : (
          <div className="cta-buttons">
            <Link to="/play" className="btn-primary"><FiPlay /> Start Playing</Link>
          </div>
        )}
      </div>

      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>Dynamic Word Bank</h3>
          <p>Over 50 carefully curated words with hints to expand your lexicon.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🏆</div>
          <h3>Competitive Scoring</h3>
          <p>Earn more points by guessing with fewer attempts.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🌓</div>
          <h3>Dark Mode</h3>
          <p>Comfortable gameplay in any lighting condition.</p>
        </div>
      </div>
    </div>
  );
}