import { BACK_URL } from "../../../constants/GlobalConstants";
/**
 * @function 유저로그인hook
 * @param {string} service
 */

export interface ServiceType {
  service: string;
}

export const GetLogin = async ({ service }: ServiceType) => {
  await fetch(`${BACK_URL}/auth/kakao`, {
    method: "GET",
    mode: "cors",
    credentials: "include", // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      if (response.access_token) {
        localStorage.setItem("key", response.access_token);
      } else if (response.access_token === undefined) {
        throw new Error("로그인 정보가 옳바르지 않습니다.");
      }
    });
};
