const User = require('../models/user');

exports.index = async (req, res) => {
  const currentUser = await User.find(req.session.userId)
  res.render('admin', {
    user: currentUser
  });
};
