import { BACK_URL } from "../../../../constants/GlobalConstants";
import ShowModal from "../../ShowModal"

interface Prop {
    friendId: string
}
export const getDetail = async ({friendId} : Prop) => {
  await fetch(`${BACK_URL}/user/search?user_id="${friendId}"`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("key")}`,
    },
  }).then((response) => response.json());
};
