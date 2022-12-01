import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Detail = () => {
  useEffect(() => {
    console.log("Detail");
  });

  return <>{/* <h1>우연 상세</h1> */}</>;
};

export default Detail;
