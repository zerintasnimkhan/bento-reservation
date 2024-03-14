const router = require("express").Router();

const infoController = require("../controllers/info.controller");
const { attachUser } = require("../middleware/attachUser");

router.post("/add", attachUser, infoController.createReservation);
router.post("/availableRestaurants", infoController.allAvailableRestaurants);
router.get("/getRestaurant/:restaurantId", infoController.fetchRestaurantById);
router.get("/allRestaurants", infoController.getAllRestaurants);
router.get("/allReservations/:restaurantId",
  infoController.getReservationsByRestaurantId
);
router.get(
  "/allReservations/restaurant/:restaurantId/date/:date",
  infoController.getReservationsByRestaurantIdAndDate
);
router.put(
  "/change-status/reservation/:reservationId/status/:status",
  infoController.changeReservationStatus
);
module.exports = router;
