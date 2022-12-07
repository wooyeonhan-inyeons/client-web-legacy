import Geocode from "react-geocode";

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
  const address =
    response.results[response.results.length - 4].address_components;
  return address[1].short_name + " " + address[0].short_name;
};
