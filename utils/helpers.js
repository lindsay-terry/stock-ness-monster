const moment = require('moment-timezone');

const formatDate = (date) => {
  // Specify the timezone you want to use
  const timezone = 'America/Los_Angeles'; // You can change this to your desired timezone
  return moment(date).tz(timezone).format('MMMM Do YYYY, h:mm:ss a z');
};

const eq = (a, b) => {
  return a === b;
};

// helper to check array values for specific conditions
const some = (array, key, value) => {
  if (Array.isArray(array)) {
    return array.some(item => item[key] === value);
  }
  return false;
}
module.exports = { formatDate, eq, some };