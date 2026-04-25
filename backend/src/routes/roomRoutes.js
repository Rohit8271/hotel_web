const express = require('express');
const { listRooms } = require('../controllers/roomController');

const router = express.Router();

// GET /api/rooms — list all rooms (supports ?type=&minPrice=&maxPrice=)
router.get('/', listRooms);

module.exports = router;
