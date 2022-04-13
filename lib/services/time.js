// fetch current time
module.exports = function time(time) {
  const currentTime = new Date();
  const lastUpdated = new Date(time); // pass in row
  const difference = currentTime - lastUpdated;
  console.log('currentTime', currentTime);
  console.log('lastUpdated', lastUpdated);
  console.log('difference', difference);
  console.log(
    'difference / (1000 * 60 * 60 * 24)',
    difference / (1000 * 60 * 60 * 24) // ms in days
  );
  return difference / (1000 * 60 * 60 * 24);
};
