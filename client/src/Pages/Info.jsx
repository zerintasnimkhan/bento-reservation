import { Flex, Form, Input, Card, Button, Divider } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RestaurantInfo from "./RestaurantInfo";

function Info({ reservationInfo }) {
  const { restaurantId } = useParams();
  const { userId } = useParams();
  const navigate = useNavigate();
  const handleEdit = async () => {
    try {
      navigate("/reserve");
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirm = () => {
    console.log(JSON.stringify(reservation));
    try {
      fetch(`http://localhost:1234/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservation),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          //setReservation(data.reservation);
        })
        .catch((error) => console.error("Error fetching data:", error));

      navigate("/thanks");
    } catch (error) {
      console.log(error);
    }
  };

  let startTime = "";
  let endTime = "";

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
  const [reservation, setReservation] = useState({});

  useEffect(() => {
    const reservationInfo = JSON.parse(
      sessionStorage.getItem("reservationInfo")
    );
    //setReservation(data.reservationInfo);

    const date = reservationInfo.date;

    const startTime = convertToDatetimeString(
      reservationInfo.date,
      reservationInfo.startTime
    );
    const endTime = convertToDatetimeString(
      reservationInfo.date,
      reservationInfo.endTime
    );
    const numberOfPeople = reservationInfo.numOfPeople;
    //setReservation(data.reservationInfo);
    const userId = 1;
    const tableId = 1;
    setReservation({
      tableId,
      restaurantId,
      userId,
      date,
      startTime,
      endTime,
      numberOfPeople,
    });
  }, [restaurantId]);
  console.log(reservation);

  const formatDate = (inputDate) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Date(inputDate).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };
  const formatTime = (inputTime) => {
    const options = { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC' };
    const formattedTime = new Date(inputTime).toLocaleTimeString('en-US', options);
    return formattedTime;
  };
  const formattedDate = formatDate(reservation.date);
  const formattedTime = formatTime(reservation.startTime);

  return (
    <Flex style={{ width: "100vw", flexDirection: "column" }}>
      <div style={{ width: "100%", textAlign: "center", marginTop: "-10vw" }}>
        <h2>Bento</h2>
        <hr></hr>
      </div>
      <div style={{ marginLeft: "5vw", marginRight: "5vw" }}>
        <h2>KFC</h2>
        <p>
          {formattedDate} at {formattedTime}
        </p>
        <p>{reservation.numberOfPeople} people</p>
        <Button
          style={{
            backgroundColor: "#038851",
            color: "white",
            paddingLeft: "6vw",
            paddingRight: "6vw",
            paddingTop: "1vh",
            paddingBottom: "4vh",
            fontSize: "16px",
            marginTop:"1vh"
          }}
          onClick={handleEdit}
        >
          Edit
        </Button>
        <Divider></Divider>
      </div>
      <div style={{ marginLeft: "5vw", marginRight: "5vw" }}>
        <h3 style={{marginBottom:"2vh", fontSize:"1.3rem", fontWeight:"inherit"}}>Your Information</h3>
        <Form>
          <Flex
            gap="middle"
            vertical
            style={{ flexDirection: "row", width: "100%" }}
          >
            <Form.Item label="First name:" name="name">
              <Input></Input>
            </Form.Item>
            <Form.Item label="Last name:">
              <Input></Input>
            </Form.Item>
          </Flex>
          <Form.Item label="Email">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Requests (optional)" >
            <Input></Input>
          </Form.Item>
          <Divider></Divider>
        </Form>
        <div style={{ marginLeft: "5vw", marginRight: "5vw" }}>
          <Card>
            <h3>Notes About This Booking</h3>
            <hr></hr>
            <p>book this for me please</p>
          </Card>
        </div>
        <br></br>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button
            style={{
              backgroundColor: "#038851",
              paddingLeft: "35vw",
              paddingRight: "35vw",
              paddingTop: "2vw",
              paddingBottom: "8vw",
              fontSize: "18px",
              color: "white",
            }}
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Flex>
  );
}

export default Info;
