//const { default: RestaurantList } = require("../../client/src/Pages/RestaurantList");
const { restaurants } = require("../data/restaurantList");
module.exports.getAllRestaurants = async () => {
  try {
    const apiUrl =
      "https://sak-skeleton-samiya-kazi.koyeb.app/restaurants/all-restaurants";
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: process.env.SAK_TOKEN,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
    const result = await response.json();

    const restaurantData = result.map((restaurant) => {
      return {
        id: restaurant.restaurantId,
        name: restaurant.restaurantName,
        cuisine: restaurant.cuisines,
        image: restaurant.restaurantCoverPhoto,
      };
    });

    return restaurantData;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

module.exports.getRestaurantById = async (restaurantId) => {
  const response = await fetch(`${process.env.RESTAURANT_URL}${restaurantId}`, {
    method: "GET",
    headers: {
      Authorization: process.env.SAK_TOKEN,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data. Status: ${response.status}`);
  }

  const result = await response.json();

  return result;
};

module.exports.getRestaurantDetails = async (availableRestaurants) => {
  const restaurantsWithDetails = await this.getAllRestaurants();
  const availableRestaurantsWithDetails = availableRestaurants.map(
    (availableRestaurant) => {
      for (let i = 0; i < restaurantsWithDetails.length; i++) {
        // console.log(restaurantsWithDetails[i])
        if (availableRestaurant.id === restaurantsWithDetails[i].id) {
          return restaurantsWithDetails[i];
        }
      }
    }
  );
  return availableRestaurantsWithDetails;
};
