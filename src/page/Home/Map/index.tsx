//4번째 방법
import react, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import {
  Cluster,
  DefaultRenderer,
  GridAlgorithm,
  MarkerClusterer,
  Renderer,
  SuperClusterAlgorithm,
} from "@googlemaps/markerclusterer";

import useGeolocation from "react-hook-geolocation";
import { useRecoilState, useResetRecoilState } from "recoil";
import { recoil_ } from "../../../recoil";
import { getNearTest } from "./api/getPost";
import { MarkerImages, MarkerImages2 } from "./components/Mark";
import MarkerClusterIcon from "./images/MarkerCluster.png";
import MarkerClusterIcon2 from "./images/MarkerCluster2.png";
import Markercluster from "./images/Markercluster.svg";

export default function Map() {
  useEffect(() => {
    console.log(process.env.REACT_APP_GOOGLE_MAP_API_KEY);
  }, []);
  return (
    <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY!}>
      <MapComponent />
    </Wrapper>
  );
}

function MapComponent() {
  const navigate = useNavigate();
  const geolocation = useGeolocation();
  const [data, setData] = useState<MarkerProps[]>([]);
  const [coordinate, setCoordinate] = useRecoilState<google.maps.LatLngLiteral>(
    recoil_.geoState
  );
  const [markers, setMarkers] = useRecoilState<MarkerProps[]>(
    recoil_.markerState
  );
  const [group, setGroup] = useRecoilState(recoil_.groupState);
  const resetGroup = useResetRecoilState(recoil_.groupState);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (geolocation.latitude !== null) {
      setCoordinate({
        lat: geolocation.latitude,
        lng: geolocation.longitude,
      });
    }
  }, [geolocation]);

  useEffect(() => {
    getNearTest(coordinate)?.then((res) => {
      setData(res);
      setMarkers(res);
    });

    // console.log("코디네이트: ", coordinate.lat, coordinate.lng);
  }, [coordinate]);

  useEffect(() => {
    initMap(coordinate, markers, navigate, setGroup, resetGroup);
    // window.initMap = initMap;
  }, [markers, initMap]);

  useEffect(() => {
    //모달 상태에서 스크롤 막기
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [data]);

  return <div ref={ref!} id="map" />;
}

//맵 불러오는 함수
function initMap(
  coordinate: google.maps.LatLngLiteral,
  data: Array<any>,
  navigate: any,
  setGroup: any,
  resetGroup: any
): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    { center: coordinate, ...options }
  );

  const markers = data?.map((item: MarkerProps, index: number) => {
    const marker = new google.maps.Marker({
      title: item.post_id,
      position: { lat: item.latitude, lng: item.longitude },
      icon: item.viewed
        ? {
            url: MarkerImages2.viewed[index % 8],
            scaledSize: new google.maps.Size(56, 56),
          }
        : item.forFriend
        ? {
            url: MarkerImages2.friend[index % 8],
            scaledSize: new google.maps.Size(56, 56),
          }
        : {
            url: MarkerImages2.default[index % 8],
            scaledSize: new google.maps.Size(56, 56),
          },
    });

    marker.addListener("click", () => {
      navigate(`detail/${item.post_id}`);
    });
    return marker;
  });

  const renderer = {
    render: ({ position, bounds, count, markers }: Cluster) => {
      const mc = new google.maps.Marker({
        // gridSize: 50,
        icon: Markercluster,
        label: {
          text: String(count),
          color: "#fff",
          fontSize: "0.9rem",
        },
        position,
        // adjust zIndex to be above other markers
        zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
      });
      mc.addListener("click", () => {
        // console.log(group);
        resetGroup();

        markers?.map((item: any) =>
          setGroup((prev: any) => [...prev, item.title])
        );
        navigate("/group");
        // console.log(map.getZoom());
      });

      return mc;
    },
  };
  // const algorithm = new GridAlgorithm({gridSize: });

  const algorithm = new SuperClusterAlgorithm({
    radius: 400,
    maxZoom: 22,
  });

  const markerClusterer = new MarkerClusterer({
    algorithm,
    map,
    markers,
    renderer,
  });
}

function setGroupMarker(): void {}

export interface MarkerProps {
  content: string;
  created_time: string;
  latitude: number;
  longitude: number;
  post_id: string;
  forFriend: boolean;
  viewed: boolean;
}

declare global {
  interface Window {
    initMap: () => void;
  }
}

const options: any = {
  zoom: 17,
  mapId: "7c08bc77e896521d",
  backgroundColor: "#242f3e",
  minZoom: 13,
  // maxZoom: 20,
  gestureHandling: "none",
  // zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
  clickableIcons: false,
  disableDefaultUI: true,
  setMyLocationEnabled: true,
};
