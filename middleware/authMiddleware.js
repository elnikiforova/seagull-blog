const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

const requireAuth = (req, res, next) => {
  console.log('>>>>> REQ.BODY >>>>>', req.body, '>>>>> REQ.COOOKIES >>>>>', req.cookies);
  const token = req.cookies.jwt;

  // check jwt exists & is valid
  if (token) {
    jwt.verify(token, 'seagull secret line', (err, decodedToken) => {
      if (err) {
        console.log('>>>> REQUIRE AUTH ERROR >>>>', err.message);
        res.redirect('/login');
      } else {
        console.log('>>>> REQUIRE AUTH: DECODED TOKEN >>>>', decodedToken);
        next();
      }
    });
  }
  else {
    res.redirect('/login');
  }
}

// check current user
const secret = process.env.JWT_SECRET;
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        console.log('>>>> CHECK USER ERROR >>>>', err.message);
        res.locals.user = null;
        next();
      } else {
        console.log('>>>> CHECK USER: DECODED TOKEN >>>>', decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  }
  else {
    res.locals.user = null;
    next();
  }
}

module.exports = { requireAuth, checkUser };
