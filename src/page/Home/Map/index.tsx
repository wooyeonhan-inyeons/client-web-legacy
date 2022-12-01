// import { MarkerClusterer } from "@googlemaps/markerclusterer";
// import { useCallback, useEffect, useRef } from "react";
// import { useQuery } from "react-query";
// import { GetTestPost } from "../../../Hooks";

// const options = {
//   zoom: 17,
//   minZoom: 13,
//   maxZoom: 20,
//   center: { lat: 35.859115, lng: 128.487598 },
//   zoomControl: false,
//   mapTypeControl: false,
//   scaleControl: false,
//   streetViewControl: false,
//   rotateControl: false,
//   fullscreenControl: false,
//   clickableIcons: false,
//   mapId: "7c08bc77e896521d",
//   backgroundColor: "#242f3e",
// };

// export const Map = () => {
//   const mapElement = useRef(null);

//   const { data } = useQuery("getMerker", GetTestPost, {
//     retry: 3,
//   });

//   // 컴포넌트가 마운트될 때, 수동으로 스크립트를 넣어줍니다.
//   // 이는 script가 실행되기 이전에 window.initMap이 먼저 선언되어야 하기 때문입니다.
//   const loadScript = useCallback((url: string) => {
//     const firstScript = window.document.getElementsByTagName("script")[0];
//     const newScript = window.document.createElement("script");
//     newScript.src = url;
//     newScript.async = true;
//     newScript.defer = true;
//     firstScript?.parentNode?.insertBefore(newScript, firstScript);
//   }, []);

//   // script에서 google map api를 가져온 후에 실행될 callback 함수
//   const initMap = useCallback(() => {
//     const { google } = window;
//     if (!mapElement.current || !google) return;

//     const map = new google.maps.Map(mapElement.current, options);

//     const markers = data?.map((item, i) => {
//       const marker = new google.maps.Marker({
//         position: { lat: item.latitude, lng: item.longitude },
//         label: item.content,
//         // icon: item.url,
//       });
//       return marker;
//     });
//     new MarkerClusterer({ markers, map });
//   }, []);

//   useEffect(() => {
//     const script = window.document.getElementsByTagName("script")[0];
//     const includeCheck = script.src.startsWith(
//       "https://maps.googleapis.com/maps/api"
//     );
//     // script 중복 호출 방지
//     if (includeCheck) return initMap();

//     window.initMap = initMap;
//     loadScript(
//       `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&callback=initMap&language=ko`
//     );
//   }, [initMap, loadScript]);

//   useEffect(() => {
//     // initMap();
//   }, []);

//   return <div id="google_map" ref={mapElement} />;
// };

//React 방식이지만 원하는 대로 잘 안됨.
import React, { useEffect } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useQuery } from "react-query";
import { GetTestPost } from "../../../Hooks";

const containerStyle = {
  width: "100%",
  height: "100vh",
};
const center = { lat: 35.859115, lng: 128.487598 };
const options = {
  mapId: "7c08bc77e896521d",
  backgroundColor: "#242f3e",
  // minZoom: 13,
  // maxZoom: 17,
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
  clickableIcons: false,
};

export const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_API_KEY!, // 구글에서 키를 받아서 입력해야 한다
  });

  const [map, setMap] = React.useState(null);

  const { data } = useQuery("getMerker", GetTestPost, {
    retry: 3,
    onSuccess: () => {},
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: 35.859115, lng: 128.487598 }}
      zoom={17} //줌
      options={options}
    >
      {data?.map((item, index) => (
        <MarkerF
          key={index}
          position={{ lat: item.latitude, lng: item.longitude }}
          icon={{ url: item.url, scale: 5 }}
          cursor="pointer"
        />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
};
