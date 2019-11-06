const axios = require('axios');
const express = require('express');
const hbs = require('hbs');

const router = express.Router();

const getNewToken = require('../lib/getNewToken');
const handleLibCalError = require('../lib/handleLibCalError');
const orderEventsByDay = require('../lib/orderEventsByDay');

hbs.registerHelper({
  dateLong: start => {
    const day = new Intl.DateTimeFormat(
      'en-US',
      {
        weekday: 'long',
        timeZone: 'America/Denver',
      }
    ).format(new Date(start))
    const date = new Intl.DateTimeFormat(
      'en-US',
      {
        dateStyle: 'medium',
        timeZone: 'America/Denver',
      }
    ).format(new Date(start))
    return `${day}, ${date}`
  },
  dateShort: start => {
    const day = new Intl.DateTimeFormat(
      'en-US',
      {
        weekday: 'short',
        timeZone: 'America/Denver',
      }
    ).format(new Date(start))
    const date = new Intl.DateTimeFormat(
      'en-US',
      {
        dateStyle: 'medium',
        timeZone: 'America/Denver',
      }
    ).format(new Date(start))
    return `${day}, ${date}`
  },
  seats_available: (seats, seats_taken, registration) => {
    if (registration) {
      return `${seats - seats_taken}  seats available`;
    }
    return 'open availability';
  },
  time: start => new Intl.DateTimeFormat('en-US', { hour: 'numeric' , timeZone: 'America/Denver' }).format(new Date(start)),
});

/* GET home page. */
router.get('/', async (req, res, next) => {
  if (!process.env.ACCESS_TOKEN) { return getNewToken(req, res, next); }

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
    handleLibCalError(error, req, res, next);
  });
});

module.exports = router;
