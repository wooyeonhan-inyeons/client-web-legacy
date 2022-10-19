import React from "react";
import { Loader } from "@googlemaps/js-api-loader";
import styled from "styled-components";

const GoogleMap = styled.div`
  width: 100vw;
  height: 100vh;
`;

function Map() {
  let map: google.maps.Map;

  const additionalOptions = {};

  const loader = new Loader({
    apiKey: String(process.env.REACT_APP_MAP_KEY),
    version: "weekly",
    ...additionalOptions,
  });

  loader.load().then(() => {
    map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  });

  return <GoogleMap id="map" />;
}

export default Map;
