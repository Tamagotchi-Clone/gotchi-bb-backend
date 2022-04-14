// fetch current time
module.exports = function time(time) {
  const currentTime = new Date();
  const lastUpdated = new Date(time);
  const difference = currentTime - lastUpdated;
  return difference / (1000 * 60 * 60 * 24);
};
