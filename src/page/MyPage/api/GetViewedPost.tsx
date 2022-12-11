import { BACK_URL } from "../../../constants/GlobalConstants";
interface postMineProp {
  idx: number;
}
export const GetViewedPost = async ({ idx = 0 }: postMineProp) => {
  console.log(idx);
  if (idx === null) return undefined;
  const response = await fetch(`${BACK_URL}/posting/viewed?page=${idx}`, {
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("key")}`,
    },
  }).then((response) => {
    return response.json();
  });
  return response;
};
