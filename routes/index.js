const axios = require('axios');
const express = require('express');
const hbs = require('hbs');

const router = express.Router();

const User = require('../models/user');

const getNewToken = require('../lib/getNewToken');
const handleLibCalError = require('../lib/handleLibCalError');
const orderEventsByDay = require('../lib/orderEventsByDay');

hbs.registerHelper({
  dateLong: rawDate => {
    if (!rawDate) {
      return ''
    }
    const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(rawDate));
    const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(rawDate));
    return `${day}, ${date}`;
  },
  dateShort: start => {
    const day = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(new Date(start));
    const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(start));
    return `${day}, ${date}`;
  },
  seats_available: event => {
    if (event.registration) {
      return `${event.seats - event.seats_taken}  seats available`;
    } else if (event.title === 'Open Studio & Limited Shop Access') {
      return 'open availability';
    }
    return 'see event details';
  },
  time: start => new Intl.DateTimeFormat(
    'en-US',
    {
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'America/Denver',
    },
  ).format(new Date(start)),
});

/* GET home page. */
router.get('/', async (req, res, next) => {
  const currentUser = await User.find(req.session.userId);
  if (!process.env.ACCESS_TOKEN) { return getNewToken(req, res, next); }

  const url = process.env.LIBCAL_EVENTS_URL;
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  };

  axios.get(url, config).then(response => {
    const { events } = response.data;
    const days = orderEventsByDay(events);

    res.render('index', {
      currentUser,
      days,
      title: 'BLDG 61 Calendar',
    });
  }).catch(error => {
    handleLibCalError(error, req, res, next);
  });
});

module.exports = router;
