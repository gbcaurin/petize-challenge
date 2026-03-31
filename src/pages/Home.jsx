import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Home() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="home">
      <h1>{t("home.text")}</h1>
      <input
        type="text"
        placeholder={t("home.placeholder")}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={() => navigate(`/profile/${username}`)}>
        {t("home.button")}
      </button>
    </div>
  );
}

export default Home;
