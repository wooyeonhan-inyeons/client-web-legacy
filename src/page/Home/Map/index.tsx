import React, { useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

export const Map = () => {
  const center = {
    lat: 35.858875,
    lng: 128.487727,
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_API_KEY!,
  });

  const [map, setMap] = useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap onLoad={onLoad} onUnmount={onUnmount} zoom={15} />
  ) : (
    <></>
  );
};
