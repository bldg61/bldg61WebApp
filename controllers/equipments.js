const Category = require('../models/category');
const Equipment = require('../models/equipment');
const User = require('../models/user');

exports.create = async (req, res) => {
  const equipment = await Equipment.create(req.body);
  if (equipment.errors) {
    const currentUser = await User.find(req.session.userId);
    const categories = await Category.all();
    const equipments = await Equipment.all();
    return res.render('admin', {
      currentUser,
      equipment,
      equipments,
      categories,
    });
  } else {
    res.redirect('/admin');
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await Equipment.delete(id);
  res.redirect('/admin');
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const equipment = await Equipment.update({ ...req.body, id });
  if (equipment.errors) {
    const currentUser = await User.find(req.session.userId);
    const categories = await Category.all();
    const equipments = await Equipment.all();
    res.render('admin', {
      currentUser,
      equipment,
      equipments,
      categories,
    });
  } else {
    res.redirect('/admin');
  }
};
