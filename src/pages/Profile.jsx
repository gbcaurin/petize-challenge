import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { user, repos } from "../services/github.js";
import { userSchema } from "../schemas/user.js";
import { repoSchema } from "../schemas/repository.js";
import { z } from "zod";

function Profile() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [reposData, setReposData] = useState([]);
  const [page, setPage] = useState(1);
  const [moreRepos, setMoreRepos] = useState(true);
  const [sort, setSort] = useState("created");
  const obsRef = useRef();

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

  useEffect(() => {
    async function fetchReposData() {
      try {
        const reposData = await repos(username, page, sort);
        const validate = z.array(repoSchema).safeParse(reposData);
        if (!validate.success) {
          console.error("Invalid repos data:", validate.error);
          return;
        }
        setReposData((prev) => [...prev, ...validate.data]);
        if (validate.data.length < 10) {
          setMoreRepos(false);
        }
      } catch (error) {
        console.error("Error fetching repos data:", error);
      }
    }

    fetchReposData();
  }, [username, page, sort]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && moreRepos) {
        setPage((prev) => prev + 1);
      }
    });
    observer.observe(obsRef.current);
    return () => observer.disconnect();
  }, [moreRepos]);

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

      <h2>Repos</h2>
      {reposData.map((repo) => (
        <div key={repo.id}>
          <p>Name: {repo.name}</p>
          <p>Description: {repo.description}</p>
          <p>Stars: {repo.stargazers_count}</p>
          <p>Forks: {repo.forks_count}</p>
          <p>Language: {repo.language}</p>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </div>
      ))}
      <div ref={obsRef} />
      <button onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
}

export default Profile;
