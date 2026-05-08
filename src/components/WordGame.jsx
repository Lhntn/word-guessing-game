import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSound } from '../contexts/SoundContext';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { wordBank } from '../utils/wordBank';

export default function WordGame({ onScoreSaved }) {
  const { currentUser, userProfile } = useAuth();
  const { playCorrect, playWrong } = useSound();
  const [currentWord, setCurrentWord] = useState(null);
  const [displayWord, setDisplayWord] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing');
  const [sessionScore, setSessionScore] = useState(0);
  const maxAttempts = 6;

  useEffect(() => {
    loadNewWord();
  }, []);

  const loadNewWord = () => {
    const randomIndex = Math.floor(Math.random() * wordBank.length);
    const wordData = { ...wordBank[randomIndex], word: wordBank[randomIndex].word.toLowerCase() };
    setCurrentWord(wordData);
    setDisplayWord(Array(wordData.word.length).fill('_'));
    setGuessedLetters([]);
    setWrongAttempts(0);
    setGameStatus('playing');
  };

  const calculateScore = () => {
    const basePoints = 100;
    const attemptBonus = (maxAttempts - wrongAttempts) * 10;
    const wordBonus = currentWord.word.length * 5;
    return basePoints + attemptBonus + wordBonus;
  };

  const saveScore = async () => {
    const pointsEarned = calculateScore();
    setSessionScore(prev => prev + pointsEarned);
    
    try {
      await addDoc(collection(db, 'scores'), {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        displayName: userProfile?.displayName || currentUser.email.split('@')[0],
        word: currentWord.word,
        points: pointsEarned,
        attemptsUsed: wrongAttempts,
        timestamp: serverTimestamp()
      });
      if (onScoreSaved) onScoreSaved();
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  const handleGuess = (letter) => {
    if (gameStatus !== 'playing' || guessedLetters.includes(letter)) return;

    const newGuessed = [...guessedLetters, letter];
    setGuessedLetters(newGuessed);

    if (currentWord.word.includes(letter)) {
      playCorrect();
      const newDisplay = currentWord.word.split('').map((char, idx) => 
        newGuessed.includes(char) ? char : '_'
      );
      setDisplayWord(newDisplay);

      if (!newDisplay.includes('_')) {
        setGameStatus('won');
        saveScore();
      }
    } else {
      playWrong();
      const newWrongAttempts = wrongAttempts + 1;
      setWrongAttempts(newWrongAttempts);
      
      if (newWrongAttempts >= maxAttempts) {
        setGameStatus('lost');
      }
    }
  };

  const handleNewGame = () => {
    loadNewWord();
  };

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  return (
    <div className="word-game">
      <div className="game-header">
        <div className="session-score">
          Session Score: {sessionScore} points
        </div>
        <div className="attempts">
          Attempts Left: {maxAttempts - wrongAttempts} / {maxAttempts}
        </div>
      </div>

      {currentWord && (
        <>
          <div className="hint-container">
            <span className="hint-label">Hint:</span>
            <span className="hint-text">{currentWord.hint}</span>
          </div>

          <div className="word-display">
            {displayWord.map((letter, idx) => (
              <div key={idx} className="letter-tile">
                {letter}
              </div>
            ))}
          </div>

          {(gameStatus === 'playing' || gameStatus === 'won' || gameStatus === 'lost') && (
            <>
              <div className="keyboard">
                {alphabet.map(letter => (
                  <button
                    key={letter}
                    onClick={() => handleGuess(letter)}
                    disabled={guessedLetters.includes(letter) || gameStatus !== 'playing'}
                    className={`key-btn ${guessedLetters.includes(letter) ? 
                      (currentWord.word.includes(letter) ? 'correct' : 'wrong') : ''}`}
                  >
                    {letter}
                  </button>
                ))}
              </div>

              {gameStatus === 'won' && (
                <div className="game-message success">
                  Excellent! You guessed the word correctly!
                </div>
              )}

              {gameStatus === 'lost' && (
                <div className="game-message error">
                  Game Over! The word was "{currentWord.word}".
                </div>
              )}

              <div className="game-actions">
                <button onClick={handleNewGame} className="new-game-btn">
                  {gameStatus !== 'playing' ? 'Play Again' : 'New Word'}
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}