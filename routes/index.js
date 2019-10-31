const axios = require('axios');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const url = 'https://calendar.boulderlibrary.org/1.1/events?cal_id=3426'

  axios.get(url, { headers: { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` } })
  .then(function (response) {
    const events = response.data.events

    res.render('index', {
      title: 'Express',
      events
    });
  })
  .catch(function (error) {
    console.log(error);
    if (error.response.data.error_description === 'The access token provided has expired') {
      process.env.ACCESS_TOKEN = getNewToken()
    }

    res.render('error', {
      error : {
        status: error.response.status,
        stack: 'Oh Noes! Something about the LibCal API just did a sads.'
      },
      message: error.response.data.error_description,
    });
  })
});

function getNewToken() {
  return "OH NOES THE TOKEN NOOOOOOO"
}

module.exports = router;
