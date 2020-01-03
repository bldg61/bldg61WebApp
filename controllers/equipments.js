const Equipment = require('../models/equipment');

exports.create = async (req, res) => {
  const equipment = await Equipment.create(req.body);
  if (equipment.errors) {
    res.render('admin', {
      equipment,
    });
  } else {
    res.redirect('/admin');
  }
};
