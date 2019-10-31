const axios = require('axios');
const express = require('express');
const hbs = require('hbs');

const router = express.Router();

const getNewToken = require('../lib/getNewToken');
const orderEventsByDay = require('../lib/orderEventsByDay');

hbs.registerHelper({
  date: start => new Intl.DateTimeFormat('en-US').format(new Date(start)),
  seats_available: (seats, seats_taken, registration) => {
    if (registration) {
      return `${seats - seats_taken}  seats available`;
    }
    return 'open availability';
  },
  time: start => new Intl.DateTimeFormat('en-US', { hour: 'numeric' }).format(new Date(start)),
});

/* GET home page. */
router.get('/', async (req, res) => {
  if (!process.env.ACCESS_TOKEN) { return getNewToken(res); }

  const url = process.env.EVENTS_URL;
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  };

  axios.get(url, config).then(response => {
    const { events } = response.data;
    const days = orderEventsByDay(events);

    res.render('index', {
      title: 'BLDG 61 Calendar',
      days,
    });
  }).catch(error => {
    const connectionError = !error.response;

    if (connectionError) {
      return res.render('error', {
        error: {
          status: error.errno,
          stack: 'Oh Noes! Something just did a sads.',
        },
        message: error.code,
      });
    }

    const errorDescription = error.response.data.error_description;
    const expiredToken = errorDescription === 'The access token provided has expired';
    const invalidToken = errorDescription === 'The access token provided is invalid';
    const tokenError = expiredToken || invalidToken;

    if (tokenError) {
      return getNewToken(res);
    }

    return res.render('error', {
      error: {
        status: error.response.status,
        stack: 'Oh Noes! Something about the LibCal API just did a sads.',
      },
      message: error.response.data.error_description,
    });
  });
});

module.exports = router;
