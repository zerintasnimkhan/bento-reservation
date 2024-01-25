const {
  addReservationInfo,
  getReservedRestaurants,
  getAvailableTables,
  getAvailableRestaurants,
  getRestaurantInfoById,
} = require("../models/info.model");
// const { restaurants } = require("../data/restaurantList.js");

const InfoModel = require("../models/info.model");
const {
  getAllRestaurants,
  getRestaurantById,
  getAllTables,
  getRestaurantDetails
} = require("../services/restaurant.service.js");
module.exports.createReservation = async (req, res) => {
  try {
    console.log(req.body);
    const {
      restaurantId,
      tableId,
      userId,
      date,
      startTime,
      endTime,
      numberOfPeople,
      status,
      userName,
      userEmail,
      phoneNumber,
      createdAt,
    } = req.body;

    if (
      !userId ||
      !restaurantId ||
      !tableId ||
      !date ||
      !startTime ||
      !endTime ||
      !numberOfPeople
    ) {
      return res.status(400).json();
    }
    const reservationData = {
      restaurantId,
      tableId,
      userId,
      date,
      startTime,
      endTime,
      numberOfPeople,
      status,
      userName,
      userEmail,
      phoneNumber,
      createdAt,
    };

    console.log(reservationData);

    const savedReservation = await addReservationInfo(reservationData);

    res
      .status(201)
      .json({ message: "Reservation added", review: savedReservation });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports.allAvailableRestaurants = async (req, res) => {
  
  try {
  
    const { startTime, endTime } = req.body;
    const reservedRestaurants = await getReservedRestaurants(
      startTime,
      endTime
    );
    const allTables = await getAllTables();
    // console.log(allTables)
    const availableTables = await getAvailableTables(
      allTables,
      reservedRestaurants
    );
    const availableRestaurants = getAvailableRestaurants(availableTables);
      
    const availableRestaurantsWithAllDetails = await getRestaurantDetails(availableRestaurants);
    console.log(availableRestaurantsWithAllDetails)
    res.status(200).json({ availableRestaurants: availableRestaurants });

  } catch (error) {
    console.log(error);
  }
};

module.exports.fetchRestaurantById = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const restaurant = getRestaurantById(restaurantId);
    return res.status(200).json(restaurant);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error getting restaurant by ID" });
  }
};

module.exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await getAllRestaurants();
    if (!restaurants) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.json(restaurants);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


