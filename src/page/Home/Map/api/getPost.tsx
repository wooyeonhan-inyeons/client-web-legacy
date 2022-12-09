import { BACK_URL } from "../../../../constants/GlobalConstants";

export const GetPostOne = async (
  post_id?: string | undefined,
  lat?: number,
  lng?: number
) => {
  if (lat === undefined) throw new Error("알 수 없는 오류가 발생하였습니다.");
  return fetch(
    `${BACK_URL}/posting?post_id=${post_id}&latitude=${lat}&longitude=${lng}`,
    // `${BACK_URL}/posting/near?latitude=35.8591&longitude=128.4878`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
    }
  ).then((response) => {
    // if (response.ok) console.log(response.json());
    return response.json();
  });
};

// export const GetNearPost = async (
//   center?: google.maps.LatLng | google.maps.LatLngLiteral
// ) => {
//   console.log(center);
//   try {
//     const response = await fetch(
//       `${BACK_URL}/posting/near?latitude=${center?.lat}&longitude=${center?.lng}`,
//       // `${BACK_URL}/posting/near?latitude=35.8591&longitude=128.4878`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${localStorage.getItem("key")}`,
//         },
//       }
//     );
//     return response.json();
//   }
// };

export const getNearTest = (
  center?: google.maps.LatLng | google.maps.LatLngLiteral
) => {
  if (center === undefined)
    throw new Error("알 수 없는 오류가 발생하였습니다.");
  return fetch(
    `${BACK_URL}/posting/near?latitude=${center?.lat}&longitude=${center?.lng}`,
    // `${BACK_URL}/posting/near?latitude=35.8591&longitude=128.4878`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
    }
  ).then((response) => {
    // if (response.ok) console.log(response.json());
    return response.json();
  });
  // ㅋㅋㅋㅋ 모르겠다 왜 return 이렇게 하는지
};

export const GetNearPost = async (
  center?: google.maps.LatLng | google.maps.LatLngLiteral
) => {
  if (!center === false) throw new Error("알 수 없는 오류가 발생하였습니다.");
  const response = await fetch(
    `${BACK_URL}/posting/near?latitude=${center?.lat}&longitude=${center?.lng}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
    }
  ).then((response) => {
    // if (response.ok) console.log(response.json());
    return response.json();
  });
  return response;
  // ㅋㅋㅋㅋ 모르겠다 왜 return 이렇게 하는지
};
