const Category = require('../models/category');
const Equipment = require('../models/equipment');
const User = require('../models/user');

exports.index = async (req, res) => {
  const currentUser = await User.find(req.session.userId);
  const categories = await Category.all();
  const equipments = await Equipment.all();
  const adminDashboardData = {
    categories,
    currentUser,
    equipments,
  }
  if (req.session.errors) {
    const errors = { ...req.session.errors}
    req.session.errors = undefined
    return res.render('admin', { ...adminDashboardData, errors });
  }
  return res.render('admin', adminDashboardData);
};
