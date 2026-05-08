import { useState } from 'react';
import WordGame from '../components/WordGame';
import { useAuth } from '../contexts/AuthContext';

export default function Play() {
  const { userProfile } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  return (
    <div className="play-container">
      <div className="play-header">
        <h1>Word Challenge Arena</h1>
        <p>Welcome, {userProfile?.displayName || 'Player'}! Guess the word using hints and letters.</p>
      </div>
      <WordGame onScoreSaved={() => setRefreshTrigger(prev => prev + 1)} />
      <div className="game-instructions">
        <h3>How to Play</h3>
        <ul>
          <li>Read the hint to understand the word's context</li>
          <li>Click letters on the keyboard to guess</li>
          <li>Each correct letter reveals its position</li>
          <li>You have 6 incorrect attempts before game over</li>
          <li>Earn more points by solving with fewer mistakes</li>
          <li>Complete words to build your session score</li>
        </ul>
      </div>
    </div>
  );
}