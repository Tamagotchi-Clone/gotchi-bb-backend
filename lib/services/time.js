// fetch current time
module.exports = function time(time) {
  const currentTime = new Date();
  const lastUpdated = new Date(time); // pass in row
  const difference = currentTime - lastUpdated;
  return difference / (1000 * 60 * 60 * 24);
};
