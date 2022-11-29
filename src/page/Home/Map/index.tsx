import React, { ReactElement, useEffect, useRef, useState } from "react";
import { LoadingBox } from "../../../components/LoadingContainer";
import { DarkStyle } from "./styled";
import { Status, Wrapper } from "./Wrapper";

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING)
    return (
      <>
        <LoadingBox />
      </>
    );
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return undefined!;
};

interface MapProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  styles: any;
}

function MyMapComponent({ center, zoom, styles }: MapProps) {
  const ref = useRef(null);

  useEffect(() => {
    new window.google.maps.Map(ref.current!, {
      center,
      zoom,
      styles,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      mapId: "7c08bc77e896521d",
    });
  });
  return <div ref={ref} id="map" />;
}

export const Map = () => {
  const [init, setInit] = useState<MapProps>();

  useEffect(() => {
    setInit({
      center: { lat: 35.859115, lng: 128.487598 },
      zoom: 15,
      styles: DarkStyle,
    });
  }, []);

  return (
    <Wrapper apiKey={process.env.REACT_APP_API_KEY!} render={render}>
      <MyMapComponent
        center={init?.center!}
        zoom={init?.zoom!}
        styles={DarkStyle}
      />
    </Wrapper>
  );
};
