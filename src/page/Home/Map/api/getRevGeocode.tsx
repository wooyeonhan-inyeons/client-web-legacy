import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API_KEY!);
Geocode.setLanguage("ko");
Geocode.setRegion("ko");
Geocode.enableDebug();

export const GetRevGeocode = async (data: { lat: number; lng: number }) => {
  if (data.lat === undefined) return undefined;
  const response = await Geocode.fromLatLng(
    data.lat.toString(),
    data.lng.toString()
  ).catch((err) => {
    throw new Error(err);
  });
  const address =
    response.results[response.results.length - 4].address_components;
  return address[1].short_name + " " + address[0].short_name;
};
