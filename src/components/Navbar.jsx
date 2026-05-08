import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>WordMaster</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/play">Play</Link>
        <Link to="/scores">Scores</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;