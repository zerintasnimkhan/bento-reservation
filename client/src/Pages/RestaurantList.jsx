import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar.component";
import RestaurantCard from "../components/RestaurantCard.component";
import CategoryList from "../components/CategoryList.component";

const RestaurantList = () => {
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

    const startTime = convertToDatetimeString(
      reservationInfo.date,
      reservationInfo.startTime
    );

    const endTime = convertToDatetimeString(
      reservationInfo.date,
      reservationInfo.endTime
    );
    fetch("https://bento-reservation-zerin.koyeb.app/availableRestaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ startTime: startTime, endTime: endTime }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAvailableRestaurants(data.availableRestaurants);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [searchData, setSearchData] = useState([]);
  const handleSearch = (e) => {
    //console.log(e.target.value);
    let searchData = e.target.value;
    let arr = [];
    if (searchData) {
      arr = availableRestaurants.filter((data) => {
        if (data.name.toLowerCase().includes(searchData.toLowerCase()))
          return data;
      });
    }
    setSearchData(arr);
  };
  console.log(searchData);

  return (
    <div style={{ marginTop: "5vh" }}>
      <SearchBar
        style={{ width: "100vw", marginLeft: "10vw", marginRight: "5vw" }}
        handleSearch={handleSearch}
        searchData={searchData}
      ></SearchBar>
      <CategoryList></CategoryList>
      <h2
        style={{
          marginLeft: "5vw",
          marginTop: "2vh",
          color: "grey",
          fontSize: "22px",
        }}
      >
        {availableRestaurants.length} Results
      </h2>
      <RestaurantCard></RestaurantCard>
    </div>
  );
};

export default RestaurantList;
