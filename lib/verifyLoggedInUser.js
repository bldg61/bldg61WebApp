module.exports = async (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.render('login');
  }

  next();
};
