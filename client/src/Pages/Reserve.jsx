import React from "react";
import { Form, Button, DatePicker, Image, Select, Flex } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const { Option } = Select;
import { parse, addHours, format } from "date-fns";

const onFinish = (values) => {
  console.log("Received values:", values);
};

const timeIntervals = [
  {
    label: "30 min",
    value: "0.5",
  },
  {
    label: "1 hr",
    value: "1",
  },
  {
    label: "1.5 hr",
    value: "1.5",
  },
  {
    label: "2 hr",
    value: "2",
  },
  {
    label: "2.5 hr",
    value: "2.5",
  },
  {
    label: "3 hr",
    value: "3",
  },
];

const Reserve = () => {
  const [dataToSend, setDataToSend] = useState({
    date: "",
    startTime: "",
    endTime: "",
    numOfPeople: "",
  });
  const reservationData = {
    date: dataToSend.date,
    startTime: dataToSend.startTime,
    endTime: dataToSend.endTime,
    numberOfPeople: dataToSend.numOfPeople,
  };

  const HandleSaveToken = async () => {
    //const token = reservationData;
    const dataToSendString = await JSON.stringify(dataToSend);
    console.log(dataToSendString);
    await sessionStorage.setItem("reservationInfo", dataToSendString);
    console.log("token saved successfully");
  };
  //console.log(token);

  const dateFormat = "ddd, MMM D, YYYY";

  const navigate = useNavigate();

  const handleFindRestaurant = async () => {
    try {
      await HandleSaveToken();
      navigate("/restaurant-list");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDatePicker = (e) => {
    //console.log(e.$d.getUTCDate());
    const date = `${e.$d.getFullYear()}-${
      e.$d.getMonth() + 1
    }-${e.$d.getUTCDate()}`;
    setDataToSend((prev) => ({ ...prev, date: date }));
  };

  //console.log(dataToSend);

  const handleEndTime = (timeInterval) => {
    const originalTime = parse(dataToSend.startTime, "h:mm a", new Date());
    // Step 2: Add 14 hours to the Date object to move from 11pm to 1pm
    const convertedTime = addHours(originalTime, timeInterval);

    // Format the result as a string (optional)
    const formattedTime = format(convertedTime, "h:mm a");
    setDataToSend((prev) => ({ ...prev, endTime: formattedTime }));
  };
  //console.log(dataToSend);

  const handleTime = (time) => {
    setDataToSend((prev) => ({ ...prev, startTime: time }));
  };
  //console.log(dataToSend);

  const handleNumOfPeople = (people) => {
    setDataToSend((prev) => ({ ...prev, numOfPeople: people }));
  };
  //console.log(dataToSend);

  return (
    <div
      className="App"
      style={{ maxWidth: "100vw", minHeight: "100vh", top: "1vh!important" }}
    >
      <div
        className="Container"
        style={{
          position: "relative",
          textAlign: "center",
          color: "white",
          marginTop: "30vw",
        }}
      >
        <Image
          width="100vw"
          height="20vh"
          style={{ filter: "brightness(45%)" }}
          src="https://www.posist.com/restaurant-times/wp-content/uploads/2016/06/louis-hansel-wVoP_Q2Bg_A-unsplash-1536x1024.jpg"
        />
        <div
          style={{
            position: "absolute",
            // top: "50%",
            // left: "50%",
            // transform: "translate(-50%, -50%)",
          }}
        >
          <p
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "white",
              borderColor: "green",
            }}
          >
            Bento Reservations
          </p>
        </div>
      </div>
      <div></div>
      <Form
        style={{ marginLeft: "5vw", marginRight: "5vw", maxWidth: "90vw" }}
        name="reservationForm"
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 30 }}
      >
        <br></br>
        <h2>Add Information for Reservation</h2>
        <Form.Item
          name="dateTimeRange"
          rules={[{ required: true }]}
          style={{ borderWidth: "20px" }}
        >
          <DatePicker
            borderWidth="20px"
            placeholder="Sat, Jan 13, 2024"
            format={dateFormat}
            style={{
              width: "100%",
              height: "4rem",
              borderWidth: "2px",
              fontSize: "1.8rem",
            }}
            onChange={handleDatePicker}
          />
        </Form.Item>

        <Flex
          gap="middle"
          vertical
          style={{ flexDirection: "row", width: "100%" }}
        >
          <Form.Item
            style={{ width: "50%" }}
            name="time"
            rules={[{ required: true, message: "Please select time!" }]}
          >
            <Select
              placeholder="7:00 pm"
              style={{
                width: "100%",
                height: "4rem",
                borderWidth: "2px",
                borderColor: "grey",
              }}
              onChange={handleTime}
            >
              <Option value="9:00 am">9:00 am</Option>
              <Option value="2:30 pm">2:30 pm</Option>
              <Option value="3:00 pm">3:00 pm</Option>
              <Option value="3:30 pm">3:30 pm</Option>
              <Option value="4:00 pm">4:00 pm</Option>
              <Option value="4:30 pm">4:30 pm</Option>
              <Option value="5:00 pm">5:00 pm</Option>
              <Option value="5:30 pm">5:30 pm</Option>
              <Option value="6:00 pm">6:00 pm</Option>
              <Option value="7:30 pm">7:30 pm</Option>
              <Option value="9:00 pm">9:00 pm</Option>
            </Select>
          </Form.Item>

          <Form.Item
            style={{ width: "50%" }}
            name="numberOfPeople"
            rules={[
              { required: true, message: "Please select the number of people" },
            ]}
          >
            <Select
              placeholder="2 people"
              style={{
                height: "4rem",
                borderWidth: "2px",
                borderColor: "grey",
                fontSize: "5rem",
              }}
              onChange={handleNumOfPeople}
            >
              {[...Array(9).keys()].map((num) => (
                <Option key={num + 1} value={(num + 1).toString()}>
                  {num + 1} people
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Flex>
        {dataToSend.startTime != "" && (
          <>
            <h2>For how long?</h2>
            <Flex wrap="wrap" gap="middle" style={{ width: "90vw" }}>
              {timeIntervals.map((timeInterval) => (
                <Button
                  key={timeInterval.value}
                  type="primary"
                  style={{
                    width: "26.9vw",
                    height: "3.5rem",
                    backgroundColor: "#038851",
                  }}
                  onClick={() => handleEndTime(timeInterval.value)}
                  // disabled={!dataToSend.startTime}
                >
                  {timeInterval.label}
                </Button>
              ))}
            </Flex>
          </>
        )}

        <div style={{ marginTop: "20px" }}>
          <hr></hr>
          <p
            style={{ fontSize: "18px", paddingLeft: "48px", color: "#038851" }}
          >
            See reservations on other dates
          </p>
          <br></br>
        </div>
      </Form>

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
            paddingLeft: "20vw",
            paddingRight: "20vw",
            paddingTop: "4vw",
            paddingBottom: "10vw",
            fontSize: "18px",
            color: "white",
          }}
          onClick={handleFindRestaurant}
          disabled={
            !dataToSend.startTime ||
            !dataToSend.date ||
            !dataToSend.numOfPeople ||
            !dataToSend.endTime
          }
        >
          Find Restaurants
        </Button>
      </div>
    </div>
  );
};

export default Reserve;
