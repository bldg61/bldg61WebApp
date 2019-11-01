const getNewToken = require('./getNewToken');

module.exports = function handleLibCalError(error, req, res, next) {
  const connectionError = !error.response;
  if (connectionError) {
    return res.render('error', {
      message: 'LibCal is not reponding',
      error: {
        status: error.code,
        stack: error,
      },
    });
  }

  const errorDescription = error.response.data.error_description;
  const expiredToken = errorDescription === 'The access token provided has expired';
  const invalidToken = errorDescription === 'The access token provided is invalid';
  const tokenError = expiredToken || invalidToken;

  if (tokenError) {
    return getNewToken(req, res, next);
  }

  return res.render('error', {
    message: `LibCal error: ${error.response.data.error_description}`,
    error: {
      status: error.response.status,
      stack: error,
    },
  });
};
