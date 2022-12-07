import { BACK_URL } from "../../../../constants/GlobalConstants";

export const getRequests = () => {
  return fetch(`${BACK_URL}/friends/request`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("key")}`,
    },
  })
    .then((response) => response.json())
    .catch((e) => alert("실패"));
};

export const getOk = (friend_id: string) => {
  return fetch(`${BACK_URL}/friends/accept`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("key")}`,
    },
    body: JSON.stringify({
      friend_id,
    }),
  }).then((res) => res.json());
};
