const { model, Schema } = require("mongoose");
//import restaurants from "../data/restaurantList";

const InfoSchema = new Schema({
  restaurantId: {
    type: String,
    required: true,
  },
  tableId: {
    type: String
  },
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  numberOfPeople: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  status: {
    type: String,
  },
  userName: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
});

const InfoModel = model("info", InfoSchema);

module.exports = InfoModel;

module.exports.addReservationInfo = ({
  restaurantId,
  tableId,
  userId,
  date,
  startTime,
  endTime,
  numberOfPeople,
}) =>
  InfoModel.create({
    restaurantId,
    tableId,
    userId,
    date,
    startTime,
    endTime,
    numberOfPeople,
  });

module.exports.getReservedRestaurants = async (startTime, endTime) => {
  // const correctDate = new Date(startTime);
  // console.log(correctDate);
  const startTimeOverlap = await InfoModel.find({
    $or: [
      {
        $and: [
          { startTime: { $lte: startTime } },
          { endTime: { $gte: startTime } },
        ],
      },
      {
        $and: [
          { startTime: { $lte: endTime } },
          { endTime: { $gte: endTime } },
        ],
      },
    ],
  });
  // console.log(startTimeOverlap);
  return startTimeOverlap;
};

module.exports.getAvailableTables = async (
  restaurants,
  getReservedRestaurants
) => {
  const allTables = restaurants.map((restaurant) => restaurant.tableId);
  // console.log(getReservedRestaurants);
  const reservedTables = getReservedRestaurants.map((getReservedRestaurant) => {
    return getReservedRestaurant.tableId;
  });
  //console.log(allTables);
  //console.log(reservedTables);

  const availableTables = allTables.filter(
    (allTable) => !reservedTables.includes(allTable)
  );

  const availableTablesWithBody = availableTables.map((availableTable) => {
    for (let i = 0; i < restaurants.length; i++) {
      if (availableTable === restaurants[i].tableId) return restaurants[i];
    }
  });

  return availableTablesWithBody;
};

module.exports.getAvailableRestaurants = (availableTablesWithBody) => {
  //console.log(uniqueRestauarants);

  const uniqueRestauarants = [];

  const restauarntIds = availableTablesWithBody.map(
    (availableTableWithBody) => {
      return availableTableWithBody.id;
    }
  );

  for (const restaurantId of restauarntIds) {
    // for (const uniqueRestaurant of uniqueRestauarants) {
    if (!uniqueRestauarants.includes(restaurantId))
      uniqueRestauarants.push(restaurantId);
    // }
  }

  const availableRestaurantsWithBody = uniqueRestauarants.map(
    (uniqueRestaurant) => {
      for (let i = 0; i < uniqueRestauarants.length; i++) {
        if (uniqueRestaurant === availableTablesWithBody[i].id)
          return availableTablesWithBody[i];
      }
    }
  );

  return availableRestaurantsWithBody;

  //console.log(uniqueRestauarants);
  //return uniqueRestauarants;
};

//console.log(getAvailableRestaurants());

module.exports.getRestaurantInfoById = (restaurantId) => InfoModel.find({restaurantId})