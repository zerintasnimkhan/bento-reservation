const {
  allReservationsByRestaurantIdAndDate,
  getAvailableTables,
} = require("../models/info.model");

module.exports.getFilteredTables = (capacity, availableTables) => {};

module.exports.getAllTables = async (numberOfPeople) => {
  const response = await fetch(`${process.env.ALL_TABLES}${numberOfPeople}`, {
    method: "GET",
    headers: {
      Authorization: process.env.POS_TOKEN,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data. Status: ${response.status}`);
  }

  const result = await response.json();

  const allTables = result.map((item) => {
    return {
      tableId: item._id,
      id: item.restaurantId,
    };
  });

  return allTables;
};

module.exports.getSuitableTables = async (restaurantId, numberOfPeople) => {
  const response = await fetch(
    `${process.env.SUITABLE_TABLE}${restaurantId}/table-capacity/${numberOfPeople}`,
    {
      method: "GET",
      headers: {
        Authorization: process.env.POS_TOKEN,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data. Status: ${response.status}`);
  }

  const result = await response.json();

  // console.log(result);
  const allTables = result.map((item) => {
    return {
      tableId: item._id,
      id: item.restaurantId,
    };
  });

  return allTables;
};

module.exports.getTable = async (restaurantId, numberOfPeople, date) => {
  const suitableTables = await this.getSuitableTables(
    restaurantId,
    numberOfPeople
  );
  const reservedTables = await allReservationsByRestaurantIdAndDate(
    restaurantId,
    date
  );

  const availableTables = getAvailableTables(suitableTables, reservedTables);

  console.log("availableTables", availableTables);
  return availableTables[0].tableId;
};
