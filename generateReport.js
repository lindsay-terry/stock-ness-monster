const { CronJob } = require('cron');
const sequelize = require('./config/connection');
const { User, Customer, Order, Product, Report } = require('./models');

console.log('Starting the report script...');

const generateReport = async () => {
  try {
    console.log('Authenticating database connection...');
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Fetch all data from the database
    console.log('Fetching users...');
    const users = await User.findAll();
    console.log('Users fetched:', users.length);

    console.log('Fetching customers...');
    const customers = await Customer.findAll();
    console.log('Customers fetched:', customers.length);

    console.log('Fetching orders...');
    const orders = await Order.findAll();
    console.log('Orders fetched:', orders.length);

    console.log('Fetching products...');
    const products = await Product.findAll();
    console.log('Products fetched:', products.length);

    // Format the data
    const reportData = {
      users: users.map(user => user.toJSON()),
      customers: customers.map(customer => customer.toJSON()),
      orders: orders.map(order => order.toJSON()),
      products: products.map(product => product.toJSON()),
    };

    // Save the report to the database
    await Report.create({
      timestamp: new Date(),
      data: reportData,
    });

    console.log('Report saved:', reportData);
  } catch (error) {
    console.error('Error generating report:', error);
    throw error;
  }
};

// Schedule the report to run every 5 minutes
const job = new CronJob('0 0 * * *', generateReport, null, true, 'America/Los_Angeles');

console.log('Starting the cron job...');
job.start();

// Generate the initial report immediately
generateReport();

module.exports = {
  getLatestReport: async () => {
    return await Report.findOne({ order: [['timestamp', 'DESC']] });
  },
  getAllReports: async () => {
    return await Report.findAll({ order: [['timestamp', 'DESC']] });
  },
};