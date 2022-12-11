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

// interface IProps {
//     user_id: string,
//     name: string,
//     message: string,
// }
export const getEdit = ( name: string, message: string) => {
    return fetch(`${BACK_URL}/user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("key")}`,
        },
        body: JSON.stringify({
            name,
            message
        })
      }).then((response) => response.json());
    };