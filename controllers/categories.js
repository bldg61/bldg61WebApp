const Category = require('../models/category');

exports.create = async (req, res, next) => {
  const category = await Category.create(req.body);

  if (category.errors) {
    req.session.errors = { category };
    req.session.save(err => {
      if (err) return next(err);
      res.redirect('/admin');
    });
  } else {
    return res.redirect('/admin');
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await Category.delete(id);
  return res.redirect('/admin');
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.update({ ...req.body, id });

  if (category.errors) {
    req.session.errors = { category };
    req.session.save(err => {
      if (err) return next(err);
      res.redirect('/admin');
    });
  } else {
    return res.redirect('/admin');
  }
};
