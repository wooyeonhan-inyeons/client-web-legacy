import { BACK_URL } from "../../../../constants/GlobalConstants";
/**
 * @function 어드민 로그인 hook
 * @param {string} username
 * @param {string} password
 */

interface FormData {
  username: string;
  password: string;
}

export const GetAdmin = async (data: FormData) => {
  await fetch(`${BACK_URL}/auth/adminLogin`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username: data.username,
      password: data.password,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.access_token) {
        localStorage.setItem("key", response.access_token);
      } else if (response.access_token === undefined) {
        throw new Error("로그인 정보가 옳바르지 않습니다.");
      }
    });
};
