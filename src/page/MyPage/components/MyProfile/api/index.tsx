import { BACK_URL } from "../../../../../constants/GlobalConstants";

export const getPostingInfo = () => {
  return fetch(`${BACK_URL}/posting/userInfo`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("key")}`,
    },
  }).then((response) => response.json());
};