import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

function Settings() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [sound, setSound] = useState(localStorage.getItem("sound") === "true");
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", true);
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", false);
    }
  }, [darkMode]);

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div>
      <h1>Settings</h1>
      <label>
        <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        Dark Mode
      </label>
      <br />
      <label>
        <input type="checkbox" checked={sound} onChange={() => setSound(!sound)} />
        Sound Effects (mock)
      </label>
      <br />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Settings;