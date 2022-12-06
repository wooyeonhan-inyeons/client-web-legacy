import { BACK_URL } from "../../../../../constants/GlobalConstants";

interface Prop {
    friendId: string
}

export const gerRequestFr = ({friendId} : Prop) => {
    return fetch(`${BACK_URL}/friends`, {
        method: "POST",
        headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
        },
        body: JSON.stringify({
        following_id: friendId,
        }),
    })
    .then((res) => res.json())
}