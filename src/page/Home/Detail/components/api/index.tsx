import { BACK_URL } from "../../../../../constants/GlobalConstants";

export const getReport = (report_type: number, post_id: string) => {
  return fetch(`${BACK_URL}/report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("key")}`,
    },
    body: JSON.stringify({
        report_type,
        post_id
    })
  }).then((response) => response.json());
};
