module.exports = async (req, res, next) => {
  console.log(req.session);
  if (!req.session) {
    return res.render('login');
  }

  next();
};
