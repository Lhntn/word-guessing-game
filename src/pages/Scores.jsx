import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

function Scores() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const q = query(collection(db, "scores"), orderBy("score", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setScores(data);
    };
    fetchScores();
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      {scores.map((score) => (
        <div key={score.id}>
          <p>{score.userEmail} - {score.score} points - {new Date(score.date?.toDate()).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default Scores;