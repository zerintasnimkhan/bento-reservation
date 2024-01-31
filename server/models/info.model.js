const { model, Schema } = require("mongoose");

const InfoSchema = new Schema({
  restaurantId: {
    type: String,
    required: true,
  },
  tableId: {
    type: String,
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

module.exports.getReservedTables = async (startTime, endTime) => {
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
  return startTimeOverlap;
};

module.exports.getAvailableTables = (tables, reservedTables) => {
  const allTables = tables.map((restaurant) => restaurant.tableId);

  const reservedTableIds = reservedTables.map((getReservedRestaurant) => {
    return getReservedRestaurant.tableId;
  });

  const availableTables = allTables.filter(
    (allTable) => !reservedTableIds.includes(allTable)
  );
  const availableTablesWithBody = availableTables.map((availableTable) => {
    for (let i = 0; i < tables.length; i++) {
      if (availableTable === tables[i].tableId) return tables[i];
    }
  });

  return availableTablesWithBody;
};

module.exports.getAvailableRestaurants = (availableTablesWithBody) => {
  const uniqueRestauarants = [];

  const restaurantIds = availableTablesWithBody.map(
    (availableTableWithBody) => {
      return availableTableWithBody.id;
    }
  );

  for (const restaurantId of restaurantIds) {
    if (!uniqueRestauarants.includes(restaurantId))
      uniqueRestauarants.push(restaurantId);
  }

  const availableRestaurantsWithBody = uniqueRestauarants.map(
    (uniqueRestaurant) => {
      for (let i = 0; i < availableTablesWithBody.length; i++) {
        if (uniqueRestaurant == availableTablesWithBody[i].id)
          return availableTablesWithBody[i];
      }
    }
  );

  return availableRestaurantsWithBody;
};

module.exports.getRestaurantInfoById = (restaurantId) =>
  InfoModel.find({ restaurantId });

module.exports.allReservationsByRestaurantId = async (restaurantId) => {
  return await InfoModel.find({ restaurantId });
};

module.exports.allReservationsByRestaurantIdAndDate = async (
  restaurantId,
  date
) => {
  return await InfoModel.find({ restaurantId, date });
};

module.exports.changeRerservationStatus = async (
  reservationId,
  reservationStatus
) => {
  return await InfoModel.findOneAndUpdate(
    { _id: reservationId },
    { $set: { status: reservationStatus } },
    { returnNewDocument: true }
  );
};
