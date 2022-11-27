import TestJson from "./TestJson.json";
export interface TestType {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface TestParam {
  idx: number;
}

export const GetTest = async (param: TestParam) => {
  // const response = await fetch(a, {
  //   method: "GET",
  // });
  // console.log(response);
  // return response.json();
  const response = await [
    TestJson[param.idx],
    TestJson[param.idx + 1],
    TestJson[param.idx + 2],
  ];

  console.log(response);
  return response;
};

// export const GetUserExperience = () => {
//   const experience: UserInfoProp = {
//     userPost: Math.floor(Math.random() * 50),
//     userFavorite: Math.floor(Math.random() * 50),
//     userFriend: Math.floor(Math.random() * 50),
//     isLast: false,
//   };
//   return [experience, experience, experience];
// };
