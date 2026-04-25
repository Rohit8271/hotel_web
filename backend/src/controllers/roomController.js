const { getAllRooms } = require('../models/roomModel');

/**
 * GET /api/rooms
 * Returns all rooms, with optional query filters: type, minPrice, maxPrice
 */
const listRooms = async (req, res, next) => {
  try {
    const { type, minPrice, maxPrice } = req.query;
    const rooms = await getAllRooms({ type, minPrice, maxPrice });

    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { listRooms };
