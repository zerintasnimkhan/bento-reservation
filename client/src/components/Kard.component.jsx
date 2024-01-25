import React from "react";
import { Card, Flex, Typography } from "antd";
const cardStyle = {
  width: 370,
  //height: 50,
};
const imgStyle = {
  display: "block",
  width: 100,
  height: 80,
  marginTop: 60,
  marginLeft: 20,
};
const Kard = () => (
  <Card
    hoverable
    style={cardStyle}
    bodyStyle={{
      padding: 0,
      overflow: "hidden",
    }}
  >
    <Flex justify="space-between">
      <img
        alt="avatar"
        src="https://hips.hearstapps.com/hmg-prod/images/finger-food-ideas-65845838df9b2.jpeg"
        style={imgStyle}
      />
      <Flex
        vertical
        align="flex-end"
        justify="space-between"
        style={{
          padding: 32,
        }}
      >
        <Typography.Title level={5}>
          “antd is an enterprise-class UI design language and React UI library.”
        </Typography.Title>
      </Flex>
    </Flex>
  </Card>
);
export default Kard;
