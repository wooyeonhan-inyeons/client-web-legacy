import { BACK_URL } from "../../../../../constants/GlobalConstants";

export const getDetail = (friendId : string) => {
  return fetch(`${BACK_URL}/user/search?user_id=${friendId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("key")}`,
    },
  }).then((response) => response.json());
};
