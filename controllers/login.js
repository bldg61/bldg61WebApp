const User = require('../models/user');

exports.create = async (req, res) => {
  const user = await User.authenticate(req.body);
  if (user.errors) {
    res.render('login', {
      user,
    });
  } else {
    req.session.userId = user.id;
    res.redirect('/admin');
  }
};

exports.new = (req, res) => {
  res.render('login');
};
