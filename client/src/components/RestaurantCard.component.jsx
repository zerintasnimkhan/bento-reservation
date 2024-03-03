import React, { useEffect, useState } from "react";
import { Card, Flex } from "antd";
import { useNavigate } from "react-router-dom";
//import { accessToken } from "mapbox-gl";
import SearchBar from "./SearchBar.component";

const RestaurantCard = () => {
  //const [restaurants, setRestaurants] = useState();

  // const restaurantData = () => {
  //   setAvailableRestaurants();
  // }
  const navigate = useNavigate();

  let startTime = "";
  let endTime = "";
  let numberOfPeople = "";

  function convertToDatetimeString(date, time) {
    try {
      const dateTimeString = `${date} ${time}`;

      const dateTime = new Date(dateTimeString);
      const dateTimeInLocal = new Date(
        dateTime.toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
      );
      const isoString =
        dateTimeInLocal.getFullYear() +
        "-" +
        ("0" + (dateTimeInLocal.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + dateTimeInLocal.getDate()).slice(-2) +
        "T" +
        ("0" + dateTimeInLocal.getHours()).slice(-2) +
        ":" +
        ("0" + dateTimeInLocal.getMinutes()).slice(-2) +
        ":" +
        ("0" + dateTimeInLocal.getSeconds()).slice(-2) +
        "." +
        ("00" + dateTimeInLocal.getMilliseconds()).slice(-3) +
        "Z";

      // const isoDate = dateTimeInLocal.toISOString();

      return isoString;
    } catch (error) {
      console.error("Error converting to datetime:", error);
    }
  }

  const [availableRestaurants, setAvailableRestaurants] = useState([]);

  useEffect(() => {
    const reservationInfo = JSON.parse(
      sessionStorage.getItem("reservationInfo")
    );

    startTime = convertToDatetimeString(
      reservationInfo.date,
      reservationInfo.startTime
    );

    endTime = convertToDatetimeString(
      reservationInfo.date,
      reservationInfo.endTime
    );

    numberOfPeople = reservationInfo.numOfPeople;


    fetch("http://localhost:8000/availableRestaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ startTime: startTime, endTime: endTime, numberOfPeople: numberOfPeople }),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("real restaurant list", data);
        setAvailableRestaurants(data.availableRestaurants);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleCard = async (restaurantId) => {
    try {
      navigate(`/restaurant/${restaurantId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {availableRestaurants.map((restaurant) => (
        <Card
          style={{
            boxShadow: "0px",
          }}
          onClick={() => {
            handleCard(restaurant.id);
          }}
          key={restaurant.id}
        >
          <img
            style={{ borderRadius: "5%", width: "88vw", height: "20vh" }}
            src={restaurant.image}
          ></img>
          <Flex
            gap="middle"
            vertical
            style={{ flexDirection: "row", width: "100%" }}
          >
            <h2>{restaurant.name}</h2>
            <img
              style={{
                width: "1.5rem",
                height: "1.5rem",
                marginLeft: "auto",
                marginRight: "0",
              }}
              src="https://res.cloudinary.com/dwrwwcvfb/image/upload/v1706020091/like_w0xnax.png"
            ></img>
            <p
              style={{
                marginTop: "0.5vh",
                marginLeft: "-3vw",
                fontWeight: "bold",
              }}
            >
              {restaurant.likes}
            </p>
          </Flex>
          <p
            style={{
              marginTop: "0.5vh",
              marginLeft: "-3vw",
              marginLeft: "auto",
              marginRight: "0",
              fontSize: "1rem",
              marginTop: "-0.8vh",
            }}
          >
            {restaurant.cuisine}
          </p>
        </Card>
      ))}
    </div>
  );
};

export default RestaurantCard;
