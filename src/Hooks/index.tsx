import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { recoil_ } from ".././recoil/index";
import { USER_ROLE } from ".././constants";
import { useNavigate } from "react-router-dom";
import { BACK_URL } from "../constants/GlobalConstants";
import TestPostData from "./TestPost.json";
import Geocode from "react-geocode";

export const GetUser = async () => {
  const response = await fetch(`${BACK_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("key")}`,
    },
  });
  console.log("USER", response);
};

export const LoginRedirect = () => {
  const [user, setUser] = useRecoilState(recoil_.userState);
  const query = window.location.search.split("=")[1];
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("key", query);
    setUser({ userId: 0, role: USER_ROLE.ADMIN });
  });

  useEffect(() => {
    if (user.role === USER_ROLE.USER) navigate("/");
  }, [user]);

  return <></>;
};

export interface TestType {
  id: number;
  content: string;
  url: string;
  latitude: number;
  longitude: number;
}

export const GetTestPost = async (): Promise<TestType[]> => {
  const response = await [TestPostData[0], TestPostData[1]];
  return response;
};

export const GetNearPost = async (data: { lat: number; lng: number }) => {
  await fetch(`${BACK_URL}/posting/near`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      latitude: data.lat,
      longitude: data.lng,
    }),
  }).then((response) => {
    console.log(response);
    return response.json();
  });
};

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API_KEY!);
Geocode.setLanguage("ko");
Geocode.setRegion("ko");
Geocode.enableDebug();

export const GetRevGeocode = async (data: { lat: number; lng: number }) => {
  const response = await Geocode.fromLatLng(
    data.lat.toString(),
    data.lng.toString()
  ).catch(() => {
    throw new Error("알 수 없는 오류가 발생하였습니다.");
  });
  console.log(response);
  const address = response.results[3].address_components;
  return (
    address[2].short_name +
    " " +
    address[1].short_name +
    " " +
    address[0].short_name
  );
};
