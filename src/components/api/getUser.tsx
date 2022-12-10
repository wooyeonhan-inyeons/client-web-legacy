import { BACK_URL } from "../../constants/GlobalConstants";

export const GetUser = async () => {
  const response = await fetch(`${BACK_URL}/user`, {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("key")}`,
    },
  }).then((res) => {
    return res.json();
  });
  return response;
};
