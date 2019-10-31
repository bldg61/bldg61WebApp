const getNewToken = require('./getNewToken');

module.exports = function handleLibCalError(res, next, error) {
  const connectionError = !error.response;
  if (connectionError) {
    const err = new Error('LibCal is not reponding');
    err.status = error.code;
    next(err);
  }

  const errorDescription = error.response.data.error_description;
  const expiredToken = errorDescription === 'The access token provided has expired';
  const invalidToken = errorDescription === 'The access token provided is invalid';
  const tokenError = expiredToken || invalidToken;


  if (tokenError) {
    return getNewToken(res, next);
  }

  const err = new Error(`LibCal is erroring... message: ${error.response.data.error_description}`);
  err.status = error.response.status;
  next(err);
};
