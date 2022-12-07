import { BACK_URL } from "../../../../constants/GlobalConstants";

export const getInfo = () => {
  return fetch(`${BACK_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("key")}`,
    },
  })
    .then((response) => response.json())
    .catch((e) => alert("유저 정보 불러오기 실패"));
};