import React, { useEffect, useState } from "react";
import { Flex } from "antd";
//import fastfood from "../assets/fastfood.png";

// const categories = [
//   {
//     id: "aszd",
//     name: "Fastfood",
//     image: "https://i.ibb.co/xLrKybC/fastfood.png",
//   },
//   {
//     id: "asyd",
//     name: "Fastfood",
//     image: "https://i.ibb.co/xLrKybC/fastfood.png",
//   },

//   {
//     id: "asvdsss",
//     name: "Fastfood",
//     image: "https://i.ibb.co/xLrKybC/fastfood.png",
//   },
//   {
//     id: "asvsd",
//     name: "Fastfood",
//     image: "https://i.ibb.co/xLrKybC/fastfood.png",
//   },
//   {
//     id: "asvdw",
//     name: "Fastfood",
//     image: "https://i.ibb.co/xLrKybC/fastfood.png",
//   },
// ];

const CategoryList = () => {
  const [cuisineInfo, setCuisineInfo] = useState(null);
  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const response = await fetch(
          `https://sak-skeleton-samiya-kazi.koyeb.app/marketplace/all-cuisines`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwic2VydmljZSI6ImNsaWVudEZhY2luZ0FwcHMiLCJyZXN0YXVyYW50SWQiOjAsImlhdCI6MTcwNTgyMDI3NX0.yrc9SKPpH062Cl513HoO7eR2Nbpq-O4j-oAxzuWlUso`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch cuisines (status: ${response.status})`
          );
        }
        const cuisineData = await response.json();
        setCuisineInfo(cuisineData);
      } catch (error) {
        console.error("Error fetching cuisines:", error.message);
      }
    };
    fetchCuisines();
  }, []);
  //console.log(cuisineInfo);

  return (
    <div style={{ width: "100vw", height: "9vh", overflow: "auto" }}>
      <Flex style={{ width: "100vw", marginLeft: "5vw" }}>
        {cuisineInfo?.map((cuisine) => (
          <Flex
            gap="2"
            vertical
            style={{
              flexDirection: "column",
              flexWrap: "wrap",
              minWidth: "22vw",
              alignItems: "center",
            }}
            key={cuisine?._id}
          >
            <img
              style={{
                borderRadius: "7.5vw",
                width: "15vw",
                height: "15vw",
              }}
              src={cuisine?.cuisineImg}
            ></img>

            <h3
              style={{
                fontSize: "0.75rem",
                marginTop: "0.4",
                textAlign: "center",
              }}
            >
              {cuisine?.cuisineName}
            </h3>
          </Flex>
        ))}
      </Flex>
    </div>
  );
};

export default CategoryList;
