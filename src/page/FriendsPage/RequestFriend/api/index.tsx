import { BACK_URL } from "../../../../constants/GlobalConstants";

export const getRequests = () => {
  return fetch(`${BACK_URL}/friends/request`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("key")}`,
    },
  }).then((response) => response.json());
};
