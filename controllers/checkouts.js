const Checkout = require('../models/checkout');

exports.create = async (req, res, next) => {
  const checkout = await Checkout.create(req.body);

  if (checkout.errors) {
    req.session.errors = { checkout };
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
  await Checkout.delete(id);
  return res.redirect('/admin');
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  const checkout = await Checkout.update({ ...req.body, id });

  if (checkout.errors) {
    req.session.errors = { checkout };
    req.session.save(err => {
      if (err) return next(err);
      res.redirect('/admin');
    });
  } else {
    return res.redirect('/admin');
  }
};
