const axios = require('axios');

module.exports = function getNewToken(res) {
  const url = 'https://calendar.boulderlibrary.org/1.1/oauth/token'
  axios.post(
    url,
    {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "client_credentials",
    }
  ).then(response => {
    process.env.ACCESS_TOKEN = response.data.access_token
    res.redirect('/')
  }).catch(error => {
    if (!error.response) {
      res.render('error', {
        error : {
          status: error.errno,
          stack: 'Oh Noes! Something just did a sads.'
        },
        message: error.code,
      });
    }
    res.render('error', {
      error : {
        status: error.response.status,
        stack: 'Oh Noes! Something about the LibCal API just did a sads.'
      },
      message: error.response.data.error_description,
    });
  })
}
