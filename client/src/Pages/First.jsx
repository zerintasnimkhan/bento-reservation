import React from "react";
import { Form, Button, DatePicker, Image, Select, Flex, Layout } from "antd";
//import "./App.css";
import Kard from "../components/Kard.component";
import MapComponent from "../components/Map.component";

const Footer = Layout;

const { RangePicker } = DatePicker;
const { Option } = Select;

const onFinish = (values) => {
  console.log("Received values:", values);
};

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: "#038851",
  height: "40px",
  paddingTop: "10px"
};
const First = () => {
  const dateFormat = "ddd, MMM D, YYYY";
  const timeFormat = "h:mm a";

  return (
    <div className="App" style={{ maxWidth: "100vw" }}>
      <div
        className="Container"
        style={{
          position: "relative",
          textAlign: "center",
          color: "white",
          opacity: "1.8",
          //filter: "brightness (50%)"
        }}
      >
        <Image
          width="100vw"
          height="20vh"
          style={{filter: "brightness(45%)"}}
          src="https://www.posist.com/restaurant-times/wp-content/uploads/2016/06/louis-hansel-wVoP_Q2Bg_A-unsplash-1536x1024.jpg"
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
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
        <h2 style={{ alignItems: "center", paddingLeft: "100px" }}>
          Z & Y Restaurant
        </h2>
        <Form.Item name="dateTimeRange" rules={[{ required: true }]}>
          <DatePicker
            placeholder="Sat, Jan 13, 2024"
            format={dateFormat}
            style={{ width: "100%" }}
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
            <Select placeholder="7:00 pm" style={{ width: "100%" }}>
              <Option value="2:00 pm">2:00 pm</Option>
              <Option value="2:30 pm">2:30 pm</Option>
              <Option value="3:15 pm">3:15 pm</Option>
              <Option value="4:00 pm">4:00 pm</Option>
              <Option value="5:45 pm">5:45 pm</Option>
              <Option value="6:30 pm">6:30 pm</Option>
              <Option value="7:00 pm">7:00 pm</Option>
              <Option value="7:30 pm">7:30 pm</Option>
              <Option value="8:00 pm">8:00 pm</Option>
              <Option value="9:15 pm">9:15 pm</Option>
            </Select>
          </Form.Item>

          <Form.Item
            style={{ width: "50%" }}
            name="numberOfPeople"
            rules={[
              { required: true, message: "Please select the number of people" },
            ]}
          >
            <Select placeholder="2 people">
              {[...Array(9).keys()].map((num) => (
                <Option key={num + 1} value={(num + 1).toString()}>
                  {num + 1} people
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Flex>

        <h2>Sat, Jan 13</h2>
        <Flex wrap="wrap" gap="middle" style={{ width: "90vw" }}>
          {Array.from(
            {
              length: 6,
            },
            (_, i) => (
              <Button
                key={i}
                type="primary"
                style={{ width: "26.9vw", height: "3.5rem", backgroundColor: "#038851" }}
              >
                6:15 pm
              </Button>
            )
          )}
        </Flex>
        <div style={{ marginTop: "20px" }}>
          <hr></hr>
          <p style={{ fontSize: "18px", paddingLeft: "48px", color: "#038851"  }}>
            See reservations on other dates
          </p>
          <br></br>
        </div>
      </Form>
      <div
        style={{
          marginLeft: "5vw",
          marginRight: "5vw",
          maxWidth: "90vw",
          textAlign: "justify",
        }}
      >
        <h3>Notes from the Business</h3>
        <p>Please call for large party</p>
        <h3>About</h3>
        <p style={{ justifyContent: "flex-start" }}>
          {" "}
          Good for Groups Street Parking Established in 2017. The Blue Pea
          Flower is indigenous to Thailand and is used in many dishes, the most
          striking feature of this plant is the color of the flower, vivid deep
          blue. This edible herbal flower is used in our dishes to give a
          wonderful color and light flavor... Blue Pea brings a new cuisine to
          San Francisco's historic Magazine mission district. We take classic
          Asian flavors and construct modern multi-layered dishes that appeal to
          sophisticated palates. Pair with our extensive Soju cocktails and
          selection of delicious wines. Enjoy dinner here and spend some time
          exploring this amazing neighborhood.
        </p>
      </div>
      <div style={{ marginLeft: "5vw", marginRight: "5vw", maxWidth: "90vw" }} >
<MapComponent></MapComponent>
</div>
      <div style={{ marginLeft: "5vw", paddingRight: "5vw" }}>
        <div>
          <h3>Photos</h3>
        </div>
        <Flex wrap="wrap" gap="middle" style={{ width: "90vw" }}>
          {Array.from(
            {
              length: 4,
            },
            (_, i) => (
              <Image
                key={i}
                type="primary"
                style={{ width: "43vw", height: "10rem"}}
                src="https://images.ctfassets.net/awb1we50v0om/2Spf80TME2zIhLqsi3Zxv9/919421a45f3260ee426c99c35235f1c8/Plates03__3__copy3.jpg?q=70&w=1920"
              >

              </Image>
            )
          )}
        </Flex>
      </div>
      <div style={{ marginLeft: "5vw", marginRight: "5vw", maxWidth: "40vw" }}>
        <h3>What are people saying?</h3>

        <Kard></Kard>
        <br></br>
        <Kard></Kard>
        <br></br>
        <Kard></Kard>
        <br></br>
        <Kard></Kard>
      </div>
      <p style={{ fontSize: "18px", paddingLeft: "60px", color: "#038851"  }}>
            Read reviews for Z & Y Restaurant
          </p>
          <hr></hr>
          <Footer style={footerStyle}>Use Bento to find great restaurants and book open tables.</Footer>
    </div>
    
  );
};

export default First;
