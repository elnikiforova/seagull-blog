const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController');
const authController = require('../controllers/authController');

// ручка для домашней страницы и чтения постов

router.get('/', indexController.indexGet);
router.get('/entries', indexController.entriesGet);

// ручки для авторизации

router.get('/signup', authController.signupGet);
router.post('/signup', authController.signupPost);
router.get('/login', authController.loginGet);
router.post('/login', authController.loginPost);
router.get('/logout', authController.logoutGet);

module.exports = router;
