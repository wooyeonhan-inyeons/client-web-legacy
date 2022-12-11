import { BACK_URL } from "../../../../../constants/GlobalConstants";

export const getDelete = (friend_id : string) => {
  return fetch(`${BACK_URL}/friends`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("key")}`,
    },
    body: JSON.stringify({friend_id})
  }).then((response) => response.json());
};
