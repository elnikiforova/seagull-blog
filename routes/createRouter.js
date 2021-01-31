const express = require('express');
const router = express.Router();

const createController = require('../controllers/createController');

// ручки для чтения и создания постов
router.get('/', createController.createGet);
router.post('/', createController.createPost);

module.exports = router;
