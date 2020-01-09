const Equipment = require('../models/equipment');

exports.create = async (req, res, next) => {
  const categoryIds =
  req.body.categoryIds === undefined ? []
  : typeof req.body.categoryIds === 'string' ? [ req.body.categoryIds ]
  : [ ...req.body.categoryIds ];

  const equipment = await Equipment.create({ ...req.body, categoryIds });

  if (equipment.errors) {
    req.session.errors = { equipment };
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
  await Equipment.delete(id);
  return res.redirect('/admin');
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  const equipment = await Equipment.update({ ...req.body, id });

  if (equipment.errors) {
    req.session.errors = { equipment };
    req.session.save(err => {
      if (err) return next(err);
      res.redirect('/admin');
    });
  } else {
    return res.redirect('/admin');
  }
};
