const {
  addReservationInfo,
  getReservedRestaurants,
  getAvailableTables,
  getAvailableRestaurants,
  getRestaurantInfoById,
} = require("../models/info.model");
const { restaurants } = require("../data/restaurantList.js");
const InfoModel = require("../models/info.model");
const {
  getAllRestaurants,
  getRestaurantById,
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
  // console.log(allAvailableRestaurants());
  try {
    // const startTime = "2024-01-17T07:30:00.000Z";
    // const endTime = "2024-01-17T09:30:00.000Z";

    //
    const { startTime, endTime } = req.body;

    console.log(startTime, endTime);
    // console.log(startTime);
    //const time = sessionStorage.getItem(accessToken);
    // const startTimeCorrected = `${startTime.split("T")[0]}T${
    //   startTime.split("T")[1]
    // }`;
    // const startTimeCorrected= ISODate(startTime)
    // console.log(startTimeCorrected);
    const reservedRestaurants = await getReservedRestaurants(
      // req.body.startTime,
      //  req.body.endTime
      startTime,
      endTime
    );

    // console.log(reservedRestaurants);
    const availableTables = await getAvailableTables(
      restaurants,
      reservedRestaurants
    );
    //console.log(availableTables);
    const availableRestaurants = getAvailableRestaurants(availableTables);
    // console.log(availableRestaurants);

    res.status(200).json({ availableRestaurants: availableRestaurants });

    // console.log(reservedRestaurants);
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
    const response = await getAllRestaurants();
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
