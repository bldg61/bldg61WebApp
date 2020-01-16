const Category = require('../models/category');
const Checkouts = require('../models/checkout');
const Tool = require('../models/tool');
const User = require('../models/user');

const getTodaysCheckoutDueDate = require('../lib/getTodaysCheckoutDueDate');

exports.index = async (req, res) => {
  const currentUser = await User.find(req.session.userId);
  const categories = await Category.all();
  const checkouts = await Checkouts.all();
  const todaysCheckoutDueDate = await getTodaysCheckoutDueDate();
  const tools = await Tool.all();
  const adminDashboardData = {
    categories,
    checkouts,
    currentUser,
    todaysCheckoutDueDate,
    tools,
  };
  if (req.session.errors) {
    const errors = { ...req.session.errors };
    req.session.errors = undefined;
    return res.render('admin', { ...adminDashboardData, errors });
  }
  return res.render('admin', adminDashboardData);
};
