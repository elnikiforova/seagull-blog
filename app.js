const express = require('express');
const path = require('path');
const hbs = require('hbs');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const indexAuthRouter = require('./routes/indexAuthRouter');
const createRouter = require('./routes/createRouter');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

// create express app
const app = express();

//
// MIDDLEWARES
// set view engine, use partials
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '/views/partials'));
// middleware static files: CCS & application.js
app.use(express.static(path.join(__dirname, '/public')));
// это зачем???
app.use(express.urlencoded({ extended: true }));
// для регистрации реквестов и ошибок в консоли
app.use(morgan('dev'));
// **** ЭТО НУЖНО ЧТОБЫ АДЖАКС РАБОТАЛ! ****
app.use(express.json());
// для кукис
app.use(cookieParser());
// END OF MIDDLEWARES
//

// роутеры и мои миддлвары
app.get('*', checkUser);
app.use('/', indexAuthRouter);
app.use('/create', requireAuth, createRouter);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

module.exports = app;
