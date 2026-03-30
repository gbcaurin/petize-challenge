import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { user } from "../services/github.js";
import { userSchema } from "../schemas/user.js";

function Profile() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await user(username);
        const validate = userSchema.safeParse(userData);
        if (!validate.success) {
          console.error("Invalid user data:", validate.error);
          return;
        }
        setUserData(validate.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, [username]);

  return (
    <div className="profile">
      <h1>Profile</h1>
      {userData && (
        <div>
          <p>Login: {userData.login}</p>
          <img src={userData.avatar_url} alt="Avatar" />
          <p>Bio: {userData.bio}</p>
        </div>
      )}
      <button onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
}

export default Profile;
