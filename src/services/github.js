export async function user(username) {
  console.log(import.meta.env.VITE_GITHUB_TOKEN);
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
    },
  });
  const userData = await response.json();
  return userData;
}

export async function repos(username, page, sort) {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?page=${page}&per_page=10&sort=${sort}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    },
  );
  const reposData = await response.json();
  return reposData;
}
