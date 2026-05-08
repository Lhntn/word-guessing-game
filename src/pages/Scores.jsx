import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { FiTrophy, FiUser, FiCalendar } from 'react-icons/fi';

export default function Scores() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topPlayers, setTopPlayers] = useState([]);

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      const scoresQuery = query(collection(db, 'scores'), orderBy('timestamp', 'desc'), limit(50));
      const querySnapshot = await getDocs(scoresQuery);
      const scoresData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setScores(scoresData);

      // Calculate top players by total points
      const playerMap = new Map();
      scoresData.forEach(score => {
        if (playerMap.has(score.userId)) {
          playerMap.set(score.userId, {
            ...playerMap.get(score.userId),
            totalPoints: playerMap.get(score.userId).totalPoints + score.points
          });
        } else {
          playerMap.set(score.userId, {
            displayName: score.displayName || score.userEmail.split('@')[0],
            totalPoints: score.points,
            userId: score.userId
          });
        }
      });
      const sortedPlayers = Array.from(playerMap.values())
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .slice(0, 10);
      setTopPlayers(sortedPlayers);
    } catch (error) {
      console.error('Error fetching scores:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading leaderboard...</div>;

  return (
    <div className="scores-container">
      <div className="leaderboard-section">
        <h1><FiTrophy /> Global Leaderboard</h1>
        <div className="top-players">
          {topPlayers.map((player, index) => (
            <div key={player.userId} className={`player-rank rank-${index + 1}`}>
              <div className="rank-number">#{index + 1}</div>
              <div className="player-info">
                <FiUser />
                <span>{player.displayName}</span>
              </div>
              <div className="player-points">{player.totalPoints} pts</div>
            </div>
          ))}
        </div>
      </div>

      <div className="recent-scores">
        <h2>Recent Word Victories</h2>
        <div className="scores-list">
          {scores.map((score) => (
            <div key={score.id} className="score-card">
              <div className="score-user">
                <strong>{score.displayName || score.userEmail.split('@')[0]}</strong>
                <span className="score-word">guessed "{score.word}"</span>
              </div>
              <div className="score-points">+{score.points} pts</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}