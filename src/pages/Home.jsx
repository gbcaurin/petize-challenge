import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Home</h1>
      <input
        type="text"
        placeholder="Digite o nome de usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <p>Username: {username}</p>
      <button onClick={() => navigate(`/profile/${username}`)}>
        Visitar Usuário
      </button>
    </div>
  );
}

export default Home;
