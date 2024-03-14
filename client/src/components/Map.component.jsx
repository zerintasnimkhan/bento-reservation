"use-client";
import React, { useState } from "react";
import Map from "react-map-gl";

const MapComponent = () => {
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
        "pk.eyJ1Ijoibm9lbGFsYW05OTk5IiwiYSI6ImNsbzEyZHd5MTAzM3kydHBtamE3djluN28ifQ.KPPVnkZ0mpaF5D0AIU635A"
      }
    ></Map>
  );
};

export default MapComponent;
