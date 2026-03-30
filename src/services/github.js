export async function user(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const userData = await response.json();
  return userData;
}

export async function repos(username, page, sort) {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?page=${page}&per_page=10&sort=${sort}`,
  );
  const reposData = await response.json();
  return reposData;
}
