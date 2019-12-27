const User = require('../models/user');
const Equipment = require('../models/equipment');

exports.index = async (req, res) => {
  const currentUser = await User.find(req.session.userId);
  const equipments = await Equipment.all()
  res.render('admin', {
    currentUser,
    equipments,
  });
};
