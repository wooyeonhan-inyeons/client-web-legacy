import { BACK_URL } from "../../../constants/GlobalConstants";

export const GetUser = async () => {
  const response = await fetch(`${BACK_URL}/user`, {
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("key")}`,
    },
  }).then((response) => {
    return response.json();
  });
  return response;
};
