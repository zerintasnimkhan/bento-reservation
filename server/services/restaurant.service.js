//const { default: RestaurantList } = require("../../client/src/Pages/RestaurantList");
const { restaurants } = require("../data/restaurantList");

module.exports.getAllRestaurants = async () => {
  try {
    const apiUrl =
      "https://sak-skeleton-samiya-kazi.koyeb.app/restaurants/all-restaurants";
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwic2VydmljZSI6ImNsaWVudEZhY2luZ0FwcHMiLCJyZXN0YXVyYW50SWQiOjAsImlhdCI6MTcwNTgyMDI3NX0.yrc9SKPpH062Cl513HoO7eR2Nbpq-O4j-oAxzuWlUso`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

module.exports.getRestaurantById = (restaurantId) => {
  const restaurant = restaurants.find((restaurant) => {
    console.log(restaurantId);
    if (restaurant.id == restaurantId) return restaurantId;
  });
  return restaurant;

};
