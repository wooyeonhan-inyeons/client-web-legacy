// import { MarkerClusterer } from "@googlemaps/markerclusterer";
// import { useCallback, useEffect, useRef } from "react";
// import { useQuery } from "react-query";
// import { LoadingBox } from "../../../components/LoadingContainer";
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

//   const { data, isLoading, isSuccess } = useQuery("getMerker", GetTestPost, {
//     retry: 3,
//     onSuccess: () => {},
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
//         icon: item.url,
//       });
//       return marker;
//     });

//     new MarkerClusterer({ markers, map });
//   }, []);

//   useEffect(() => {
//     console.log("data 있냐?");

//     const script = window.document.getElementsByTagName("script")[0];
//     const includeCheck = script.src.startsWith(
//       "https://maps.googleapis.com/maps/api"
//     );
//     // script 중복 호출 방지
//     if (includeCheck) return initMap();

//     window.initMap = initMap;
//     loadScript(
//       `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&callback=initMap&language=ko`
//     );
//     console.log("start");
//   }, [initMap, loadScript]);

//   return !isLoading ? <div id="google_map" ref={mapElement} /> : <LoadingBox />;
// };

//React 방식이지만 원하는 대로 잘 안됨.
// import { useMemo, useState } from "react";
// import {
//   GoogleMap,
//   MarkerClusterer,
//   MarkerF,
//   useJsApiLoader,
// } from "@react-google-maps/api";
// import { useQuery } from "react-query";
// import { GetTestPost } from "../../../Hooks";
// import { useNavigate } from "react-router-dom";
// import { useRecoilState } from "recoil";
// import { recoil_ } from "../../../recoil";
// import { HEADER_FN } from "../../../constants";

// const containerStyle = {
//   width: "100%",
//   height: "100vh",
// };
// const options = {
//   mapId: "7c08bc77e896521d",
//   backgroundColor: "#242f3e",
//   minZoom: 13,
//   maxZoom: 17,
//   zoomControl: false,
//   mapTypeControl: false,
//   scaleControl: false,
//   streetViewControl: false,
//   rotateControl: false,
//   fullscreenControl: false,
//   clickableIcons: false,
// };

// interface coordinate {
//   lat: number;
//   lng: number;
// }

// export const Map = () => {
//   const [, setHeader] = useRecoilState(recoil_.headerState);
//   const location = useState<coordinate>();

//   const center = useMemo(() => ({ lat: 35.859115, lng: 128.487598 }), []);
//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY!, // 구글에서 키를 받아서 입력해야 한다
//   });

//   const { data } = useQuery("getMerker", GetTestPost, {
//     retry: 3,
//     onSuccess: () => {},
//   });

//   const navigate = useNavigate();

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={17} //줌
//       options={options}
//       onLoad={(map) => {
//         console.log(map);
//       }}
//     >
//       <MarkerClusterer>
//         {(clusterer) => (
//           <>
//             {data?.map((item, index) => (
//               <MarkerF
//                 onClick={() => navigate(`/detail/${item.id}`)}
//                 key={index}
//                 position={{ lat: item.latitude, lng: item.longitude }}
//                 icon={{ url: item.url, scale: 5 }}
//                 cursor="pointer"
//                 clusterer={clusterer}
//               />
//             ))}
//           </>
//         )}
//       </MarkerClusterer>
//     </GoogleMap>
//   ) : (
//     <></>
//   );
// };

//3번 쨰 방법 ㅋㅋ
import { useState, useMemo, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  MarkerClustererF,
  MarkerF,
} from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import useGeolocation from "react-hook-geolocation";

import marker0 from "./images/marker/marker0.png";
import marker1 from "./images/marker/marker1.png";
import marker2 from "./images/marker/marker2.png";
import marker3 from "./images/marker/marker0.png";
import marker4 from "./images/marker/marker0.png";
import marker5 from "./images/marker/marker0.png";
import marker6 from "./images/marker/marker0.png";
import { useRecoilState } from "recoil";
import { recoil_ } from "../../../recoil";
import { getNearTest } from "./api/getPost";

type MapOptions = google.maps.MapOptions;

interface MarkerProps {
  content: string;
  created_time: string;
  forFriend: number;
  latitude: number;
  longitude: number;
  post_id: string;
}

const markerImages = [
  marker0,
  marker1,
  marker2,
  marker3,
  marker4,
  marker5,
  marker6,
];

export default function Map() {
  const navigate = useNavigate();
  const geolocation = useGeolocation();
  // const mapRef = useRef<GoogleMap>();
  // const [center, setCenter] = useState<LatLngLiteral>();
  const [data, setData] = useState([]);
  const [coordinate, setCoordinate] = useRecoilState<google.maps.LatLngLiteral>(
    recoil_.geoState
  );

  const options = useMemo<MapOptions>(
    () => ({
      mapId: "7c08bc77e896521d",
      backgroundColor: "#242f3e",
      minZoom: 13,
      maxZoom: 20,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      clickableIcons: false,
    }),
    []
  );
  // const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  // const { data, isLoading } = useQuery("postNear", () => GetNearPost(center), {
  //   onSuccess: () => {
  //     console.log("useQuery: ", data);
  //   },
  // });

  useEffect(() => {
    if (geolocation.latitude !== null) {
      setCoordinate({
        lat: geolocation.latitude,
        lng: geolocation.longitude,
      });
    }
  }, [geolocation]);

  useEffect(() => {
    // console.log("exec");
    getNearTest(coordinate)?.then((res) => {
      // console.log(res);
      setData(res);
    });
  }, [coordinate]);

  return (
    <GoogleMap
      zoom={17}
      center={coordinate}
      mapContainerClassName="map-container"
      options={options}
      // onLoad={onLoad}
    >
      {/* <MarkerClustererF>
        {(clusterer) => ( */}
      <>
        {data?.map((item: MarkerProps, index: number) => (
          <Marker
            key={item.post_id}
            onClick={() => navigate(`/detail/${item.post_id}`)}
            position={{ lat: item.latitude, lng: item.longitude }}
            icon={markerImages[index % 7]}
            cursor="pointer"
            // clusterer={clusterer}
          />
        ))}
      </>
      {/* )}
      </MarkerClustererF> */}
    </GoogleMap>
  );
}
