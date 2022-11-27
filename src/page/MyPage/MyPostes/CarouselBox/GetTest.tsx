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
  const response = await [
    TestJson[param.idx],
    TestJson[param.idx + 1],
    TestJson[param.idx + 2],
  ];

  // console.log(response);
  return response;
};
