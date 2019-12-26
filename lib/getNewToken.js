const axios = require('axios');

const handleLibCalError = require('./handleLibCalError');

module.exports = function getNewToken(req, res, next) {
  const url = 'https://calendar.boulderlibrary.org/1.1/oauth/token';
  axios.post(
    url,
    {
      client_id: process.env.LIBCAL_CLIENT_ID,
      client_secret: process.env.LIBCAL_CLIENT_SECRET,
      grant_type: 'client_credentials',
    },
  ).then(response => {
    process.env.ACCESS_TOKEN = response.data.access_token;
    res.redirect('/');
  }).catch(error => {
    handleLibCalError(error, req, res, next);
  });
};
