import React from "react";
import { Flex, Button, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../public/lottie/animationData.json";

const Thanks = () => {
  return (
    <Flex style={{ width: "100vw", flexDirection: "column" }}>
      <div style={{ width: "100%", textAlign: "center" }}>
        <h2>Bento</h2>
        <hr></hr>
      </div>
      <h2
        style={{
          marginLeft: "5vw",
          paddingTop: "20vw",
          paddingBottom: "10vw",
          color: "green",
          display: "flex",
          justifyContent: "center",
          fontFamily: "cursive",
          fontSize: "30px",
        }}
      >
        Thank you!
      </h2>

      <Lottie animationData={animationData} height={200} width={200} />
      <h2
        style={{
          marginLeft: "5vw",
          marginRight: "5vw",
          paddingTop: "20vw",
          paddingBottom: "10vw",
          color: "green",
          display: "flex",
          justifyContent: "center",
          fontFamily: "cursive",
          fontSize: "30px",
        }}
      >
        Reservation Confirmed!
      </h2>
    </Flex>
  );
};

export default Thanks;
