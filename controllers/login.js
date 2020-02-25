const User = require('../models/user');

exports.create = async (req, res, next) => {
  const user = await User.authenticate(req.body);
  if (user.errors) {
    return res.render('login', {
      user,
    });
  } else {
    req.session.userId = user.id;
    req.session.save(err => {
      if (err) return next(err);
      res.redirect('/admin');
    });
  }
};

exports.destroy = async (req, res, next) => {
  delete req.session.userId;
  req.session.save(err => {
    res.redirect('/')
  })
};

exports.new = (req, res) => {
  return res.render('login');
};
