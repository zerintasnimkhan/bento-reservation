"use-client";
import React, { useState } from "react";
import Map, { Marker } from "react-map-gl";
//import { Marker } from "antd";

//import "./MapComponent.css"; // Import your CSS file for styling

const MapComponent = () => {
  //const [visible, setVisible] = useState(false);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: 400,
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 12,
  });

  return (
    <Map
      initialViewState={{
        latitude: 51.521357, 
        longitude: -0.123537,
        zoom: 10,
        bearing: 0,
        pitch: 0,
      }}
      mapStyle="mapbox://styles/mapbox/outdoors-v12"
      mapboxAccessToken={
        "pk.eyJ1Ijoibm9lbGFsYW0iLCJhIjoiY2xwNjBrYWpjMXR2bjJscXl0NTc3ODBuZiJ9.sceo6XgSRD6lKMYOAVgEpA"
      }
    >

    </Map>
  );
};

export default MapComponent;
