var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const event1 = {
    "id":5737077,
    "title":"CNC Guided Access",
    "start":"2019-10-30T13:00:00-06:00",
    "url":{
      "public":"https:\/\/calendar.boulderlibrary.org\/event\/5737077",
    },
    "seats":1,
    "registration":true,
    "seats_taken":1,
    "color":"#5792FF",
  }

  const seatsAvailable = event1.seats - event1.seats_taken

  res.render('index', { title: 'Express', event1 , seatsAvailable});
});

module.exports = router;
