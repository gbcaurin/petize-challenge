export function formatDate(dateString, t) {
  const dif = Date.now() - new Date(dateString);
  const day = dif / (1000 * 60 * 60 * 24);

  if (day < 1) {
    return t("profile.today");
  } else if (day < 7) {
    return t("profile.daysAgo", { count: Math.floor(day) });
  } else if (day < 30) {
    const weeks = Math.floor(day / 7);
    return t("profile.weeksAgo", { count: weeks });
  } else if (day < 365) {
    const months = Math.floor(day / 30);
    return t("profile.monthsAgo", { count: months });
  } else {
    const years = Math.floor(day / 365);
    return t("profile.yearsAgo", { count: years });
  }
}
