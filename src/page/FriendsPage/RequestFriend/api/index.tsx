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
  .then((res) => console.log("친구 요청 완료"))
  .catch((e)=>alert("친구요청 실패"));
};
