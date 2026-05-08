import { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const words = ["react", "firebase", "javascript", "vite", "router"];
const randomWord = words[Math.floor(Math.random() * words.length)];

function Play() {
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const checkGuess = async () => {
    if (gameOver) return;
    if (guess.toLowerCase() === randomWord) {
      const newScore = score + 10;
      setScore(newScore);
      setMessage("AH YEAH! Correct! +10 points");
      setGameOver(true);

      // Save score to Firestore if user is logged in
      if (auth.currentUser) {
        await addDoc(collection(db, "scores"), {
          userEmail: auth.currentUser.email,
          score: newScore,
          date: new Date(),
          word: randomWord
        });
        alert("Score saved!");
      } else {
        alert("Login to save your score!");
      }
    } else {
      setMessage("Aww Try again!");
    }
  };

  const resetGame = () => {
    setGuess("");
    setMessage("");
    setGameOver(false);
    setScore(0);
    // optional: pick a new word
  };

  return (
    <div>
      <h1>Play Game</h1>
      <p>Guess the word: <strong>hint: it's a tech term</strong></p>
      <input type="text" onChange={(e) => setGuess(e.target.value)} disabled={gameOver} />
      <button onClick={checkGuess} disabled={gameOver}>Submit</button>
      <button onClick={resetGame}>New Game</button>
      <h2>{message}</h2>
      <p>Current Score: {score}</p>
    </div>
  );
}

export default Play;