import { BACK_URL } from "../../../constants/GlobalConstants";

export const getFriends = async () => {
  await fetch(`${BACK_URL}/friends`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("key")}`,
    },
  }).then((response) => response.json());
};
