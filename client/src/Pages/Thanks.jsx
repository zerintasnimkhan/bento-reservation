import React from "react";
import { Flex, Button, Divider } from "antd";
import { useNavigate } from "react-router-dom";

const Thanks = ({ reservation }) => {
  const navigate = useNavigate();

  const handleOk = async () => {
    try {
      navigate("/reserve");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Flex style={{ width: "100vw", flexDirection: "column" }}>
      <div style={{ width: "100%", textAlign: "center", marginTop: "-32.5vh" }}>
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
        }}
      >
        Thank you! Your reservation has been confirmed.
      </h2>
      {/* <div style={{ marginLeft: "5vw" }}>
        <h3>Your reservation token no.: 6201</h3>
        <h3>Your reservation name: Zerin Tasnim </h3>
        <h3>Table no.: 4</h3>
        <Divider></Divider>
        <br></br>
        <br></br>
        <Button
          style={{
            backgroundColor: "#038851",
            marginLeft: "32vw",
            paddingLeft: "10vw",
            paddingRight: "10vw",
            paddingTop: "2vw",
            paddingBottom: "8vw",
            fontSize: "18px",
            color: "white",
          }}
          onClick={handleOk}
        >
          OK
        </Button>
      </div> */}
    </Flex>
  );
};

export default Thanks;
