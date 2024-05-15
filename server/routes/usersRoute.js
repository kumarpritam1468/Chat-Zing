const express = require('express');
const router = express.Router();

const protectRoute = require('../middlewares/protectRoute');
const getUsers = require('../controllers/usersController');

router.get('/', protectRoute, getUsers);

module.exports = router;