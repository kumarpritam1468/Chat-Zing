const express = require('express');
const messageController = require('../controllers/messageController.js');
const protectRoute = require('../middlewares/protectRoute.js');

const router = express.Router();

router.get('/:id', protectRoute, messageController.getMessage);
router.post('/send/:id', protectRoute, messageController.sendMessage);

module.exports = router;