const Tool = require('../models/tool');

exports.create = async (req, res, next) => {
  const categoryIds =
  req.body.categoryIds === undefined ? []
  : typeof req.body.categoryIds === 'string' ? [ req.body.categoryIds ]
  : [ ...req.body.categoryIds ];

  const tool = await Tool.create({ ...req.body, categoryIds });

  if (tool.errors) {
    req.session.errors = { tool };
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
  await Tool.delete(id);
  return res.redirect('/admin');
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  const tool = await Tool.update({ ...req.body, id });

  if (tool.errors) {
    req.session.errors = { tool };
    req.session.save(err => {
      if (err) return next(err);
      res.redirect('/admin');
    });
  } else {
    return res.redirect('/admin');
  }
};
