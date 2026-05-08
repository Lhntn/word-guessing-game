import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  if (!auth.currentUser) {
    navigate("/login");
    return null;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {auth.currentUser.email}</p>
      <p>User ID: {auth.currentUser.uid}</p>
    </div>
  );
}

export default Profile;