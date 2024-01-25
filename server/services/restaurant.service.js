//const { default: RestaurantList } = require("../../client/src/Pages/RestaurantList");
const { restaurants } = require("../data/restaurantList");

module.exports.getAllRestaurants = async () => {
  try {
    const apiUrl =
      "https://sak-skeleton-samiya-kazi.koyeb.app/restaurants/all-restaurants";
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwic2VydmljZSI6ImNsaWVudEZhY2luZ0FwcHMiLCJyZXN0YXVyYW50SWQiOjAsImlhdCI6MTcwNTgyMDI3NX0.yrc9SKPpH062Cl513HoO7eR2Nbpq-O4j-oAxzuWlUso`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
    const result = await response.json();

    const restaurantData = result.map((item) => {
      return {
        id: item.restaurantId,
        name: item.restaurantName,
        cuisine: item.cuisines,
      };
    });
    
    return restaurantData;
    
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

module.exports.getAllTables = async () =>{

  const response = await fetch(process.env.ALL_TABLES, {
    method: "GET",
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwic2VydmljZSI6ImNsaWVudEZhY2luZ0FwcHMiLCJyZXN0YXVyYW50SWQiOjAsImlhdCI6MTcwNTgyMDI3NX0.yrc9SKPpH062Cl513HoO7eR2Nbpq-O4j-oAxzuWlUso`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data. Status: ${response.status}`);
  }

  const result = await response.json();

  const allTables = result.map((item) => {
    return {
      tableId : item._id,
      id : item.restaurantId
    };
  });
  
  return allTables;
}

module.exports.getRestaurantDetails = async (availableRestaurants) =>{
  const restaurantsWithDetails = await this.getAllRestaurants();
  const availableRestaurantsWithDetails = availableRestaurants.map((availableRestaurant)=>{
      for (let i = 0 ; i < restaurantsWithDetails.length; i++){
        console.log(restaurantsWithDetails[i])
        if (availableRestaurant.id ===restaurantsWithDetails[i].id){
          return restaurantsWithDetails[i];
        }
      }
  })
  return availableRestaurantsWithDetails;
}