const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const hbs = require('hbs');
const logger = require('morgan');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');
const session = require('express-session');

const adminRouter = require('./routes/admin');
const equipmentsRouter = require('./routes/equipments');
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const signupCompilerRouter = require('./routes/signupCompiler');

const verifyLoggedInUser = require('./lib/verifyLoggedInUser');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  store: new (require('connect-pg-simple')(session))(), // eslint-disable-line global-require
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
}));
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true,
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signupCompiler', signupCompilerRouter);
app.use(verifyLoggedInUser);
app.use('/admin', adminRouter);
app.use('/equipments', equipmentsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
