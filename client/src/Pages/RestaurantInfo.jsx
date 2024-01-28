import React, { useEffect, useState } from "react";
import { Button, Image, Flex, Layout } from "antd";
import { useNavigate } from "react-router-dom";
//import "./App.css";
import Kard from "../components/Kard.component";
import MapComponent from "../components/Map.component";
//import Reserve from "./Reserve";
import { useParams } from "react-router-dom";
import { fetchRestaurantInfo } from "../services/restaurant.service";
const Footer = Layout;

const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "grey",
  height: "40px",
  paddingTop: "10px",
};
const RestaurantInfo = () => {
  const { restaurantId } = useParams();

  const [restaurantInfo, setRestaurantInfo] = useState(null);

  useEffect(() => {
    fetchRestaurantInfo(restaurantId).then((data) => {
      setRestaurantInfo(data);
    });
  }, [restaurantId]);
  console.log(restaurantInfo);
  // const {
  //   params: { restaurantId },
  // } = match;
  //console.log(restaurantId);

  const navigate = useNavigate();

  const handleReserve = async () => {
    try {
      const userId = 1;
      navigate(`/info/${restaurantId}/${userId}`);
    } catch (error) {
      console.log(error);
    }
  };

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
          style={{ filter: "brightness(45%)" }}
          src={restaurantInfo?.restaurantCoverPhoto}
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
            {restaurantInfo?.restaurantName}
          </p>
        </div>
      </div>
      <div
        style={{
          marginLeft: "5vw",
          marginRight: "5vw",
          maxWidth: "90vw",
          textAlign: "justify",
        }}
      >
        <Flex
          gap="middle"
          vertical
          style={{ flexDirection: "row", width: "100%" }}
        >
          <div style={{ marginTop: "5vw", marginLeft: "50vw" }}>
            <Flex
              gap="middle"
              vertical
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <img
                style={{ width: "1.8rem", height: "2rem" }}
                src="https://res.cloudinary.com/dwrwwcvfb/image/upload/v1706020091/like_w0xnax.png"
              ></img>
              <p style={{ marginTop: "1vh" }}>52</p>
              <Button
                style={{
                  backgroundColor: "#038851",
                  color: "white",
                  paddingTop: "1.2vh",
                  paddingBottom: "3.5vh",
                }}
                onClick={handleReserve}
              >
                Reserve
              </Button>
            </Flex>
          </div>
        </Flex>

        <h3>About</h3>
        <p style={{ textOverflow: "ellipsis" }}>{restaurantInfo?.about}</p>
      </div>
      <div style={{ marginLeft: "5vw", marginRight: "5vw", maxWidth: "90vw" }}>
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
                style={{ width: "43vw", height: "10rem" }}
                src="https://images.ctfassets.net/awb1we50v0om/2Spf80TME2zIhLqsi3Zxv9/919421a45f3260ee426c99c35235f1c8/Plates03__3__copy3.jpg?q=70&w=1920"
              ></Image>
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
      <p style={{ fontSize: "18px", paddingLeft: "60px", color: "#038851" }}>
        Read reviews for Z & Y Restaurant
      </p>
      <hr></hr>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2vh",
          marginBottom: "4vh",
        }}
      >
        <Button
          style={{
            backgroundColor: "#038851",
            paddingLeft: "20vw",
            paddingRight: "20vw",
            paddingTop: "2vw",
            paddingBottom: "8vw",
            fontSize: "18px",
            color: "white",
          }}
          onClick={handleReserve}
        >
          Reserve
        </Button>
      </div>
      <Footer style={footerStyle}>
        Use Bento to find great restaurants and book open tables.
      </Footer>
    </div>
  );
};

export default RestaurantInfo;
