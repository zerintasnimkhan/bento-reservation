const getAvailableRestaurants = async (reservationInformation) => {
  try {
    /*const url = `${baseUrl}/reserve`;
    const res = await fetch(url, { headers: `${reservationInformation}` });
    return res.formData;*/

    const response = await fetch("http://localhost:8000", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationInformation),
    });
    // const response = await fetch("https://localhost:8000", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(reservationInformation),
    // });
    // console.log(response);

    sessionStorage.setItem(key, JSON.stringify(reservationInformation));
  } catch (error) {
    console.log(error);
  }
};
