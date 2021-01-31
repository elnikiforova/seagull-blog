const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// handle errors
const handleErrors = (err) => {
  console.log('>>>> HANDLING ERROR >>>> ERR.MESSAGE:', err.message, 'ERR.CODE', err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrent email') {
    errors.email = 'этот почтовый адрес незарегистрирован';
    return errors;
  }

  // incorrect password
  if (err.message === 'incorrent password') {
    errors.password = 'неверный пароль';
    return errors;
  }

  // duplicate error code
  if (err.code === 11000) {
    errors.email = 'this email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    })
  }

  return errors;
}

// токен на три дня
const secret = process.env.JWT_SECRET;
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, secret, {
    expiresIn: maxAge
  });
}

module.exports.signupGet = (req, res) => {
  res.render('auth/signup', { title: 'Регистрация' });
}

module.exports.loginGet = (req, res) => {
  res.render('auth/login', { title: 'Вход' });
}

module.exports.signupPost = async (req, res) => {
  const { username, bio, email, password } = req.body;

  try {
    const user = await User.create({ username, bio, email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

module.exports.logoutGet = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}
