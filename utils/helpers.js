const moment = require('moment-timezone');

const formatDate = (date) => {
  // Specify the timezone you want to use
  const timezone = 'America/Los_Angeles'; // You can change this to your desired timezone
  return moment(date).tz(timezone).format('MMMM Do YYYY, h:mm:ss a z');
};

const eq = (a, b) => {
  return a === b;
};

module.exports = { formatDate, eq };