const Category = require('../models/category');
const Tool = require('../models/tool');
const User = require('../models/user');

exports.index = async (req, res) => {
  const currentUser = await User.find(req.session.userId);
  const categories = await Category.all();
  const tools = await Tool.all();
  const adminDashboardData = {
    categories,
    currentUser,
    tools,
  };
  if (req.session.errors) {
    const errors = { ...req.session.errors };
    req.session.errors = undefined;
    return res.render('admin', { ...adminDashboardData, errors });
  }
  return res.render('admin', adminDashboardData);
};
