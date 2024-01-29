export const fetchRestaurantInfo = async (restaurantId) => {
  try {
    const response = await fetch(
      `https://bento-reservation-zerin.koyeb.app/getRestaurant/${restaurantId}`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch restaurant details (status: ${response.status})`
      );
    }
    const restaurantData = await response.json();
    return restaurantData;
    // setRestaurantInfo(restaurantData);
  } catch (error) {
    console.error("Error fetching restaurant details:", error.message);
  }
};
