import { BACK_URL } from "../../../../../constants/GlobalConstants";

interface Prop {
    friendId: string
}

export const getDetail = ({friendId} : Prop) => {
  return fetch(`${BACK_URL}/user/search?user_id=${friendId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("key")}`,
    },
  }).then((response) => response.json());
};
