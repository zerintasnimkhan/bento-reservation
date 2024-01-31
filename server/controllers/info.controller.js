const {
  addReservationInfo,
  getReservedTables,
  getAvailableTables,
  getAvailableRestaurants,
  allReservationsByRestaurantId,
  allReservationsByRestaurantIdAndDate,
} = require("../models/info.model");

const InfoModel = require("../models/info.model");
const {
  getAllRestaurants,
  getRestaurantById,
  getRestaurantDetails,
} = require("../services/restaurant.service.js");
const { getAllTables, getTable } = require("../services/tables.service.js");

module.exports.createReservation = async (req, res) => {
  try {
    const { restaurantId, date, startTime, endTime, numberOfPeople } = req.body;

    if (!restaurantId || !date || !startTime || !endTime || !numberOfPeople) {
      throw Error(
        "Please input all the required Data -  restaurantId, tableId, date, start Time, end Time, number of People"
      );
    }
    const tableId = await getTable(restaurantId, numberOfPeople, date);
    // const tableId = 1;
    const reservationData = {
      restaurantId,
      tableId: tableId,
      userId: req.body.user.id,
      date,
      startTime,
      endTime,
      numberOfPeople,
      status: "reserved",
      userName: req.body.user.email,
      userEmail: req.body.user.email,
      phoneNumber: "",
    };

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
    const { startTime, endTime, numberOfPeople } = req.body;
    const reservedTables = await getReservedTables(startTime, endTime);
    const allTables = await getAllTables(numberOfPeople);
    const availableTables = await getAvailableTables(allTables, reservedTables);

    const availableRestaurants = getAvailableRestaurants(availableTables);

    const availableRestaurantsWithAllDetails = await getRestaurantDetails(
      availableRestaurants
    );
    res
      .status(200)
      .json({ availableRestaurants: availableRestaurantsWithAllDetails });
  } catch (error) {
    console.log(error);
  }
};

module.exports.fetchRestaurantById = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const restaurant = await getRestaurantById(restaurantId);
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
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getReservationsByRestaurantId = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    if (!restaurantId) throw Error("please add Restaurant Id in the params");

    const reservations = await allReservationsByRestaurantId(restaurantId);
    if (!reservations)
      throw Error("Couldn't fetch reservations. MongoDB Error");

    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error getting restaurant by ID" });
  }
};

module.exports.getReservationsByRestaurantIdAndDate = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const date = req.params.date;
    const reservations = await allReservationsByRestaurantIdAndDate(
      restaurantId,
      date
    );
    return res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error getting restaurant by ID" });
  }
};

module.exports.changeReservationStatus = async (req, res) => {
  try {
    const reservationId = req.params.reservationId;
    const reservationStatus = req.params.status;
    const changedReservation = await InfoModel.changeRerservationStatus(
      reservationId,
      reservationStatus
    );
    return res.status(200).json(changedReservation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error getting restaurant by ID" });
  }
};
