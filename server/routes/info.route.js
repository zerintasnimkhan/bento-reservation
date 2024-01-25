const router = require("express").Router();

const infoController = require("../controllers/info.controller");

router.post("/add", infoController.createReservation);
router.post("/availableRestaurants", infoController.allAvailableRestaurants);
router.get("/getRestaurant/:restaurantId", infoController.fetchRestaurantById);
router.get("/allRestaurants", infoController.getAllRestaurants);

module.exports = router;
