module.exports = async function getTodaysCheckoutDueDate() {
  const now = Date.now();
  const twoWeeksInMilliseconds = 1000 * 60 * 60 * 24 * 14;
  const twoWeeksFromToday = new Date(now + twoWeeksInMilliseconds)
  return twoWeeksFromToday
};
