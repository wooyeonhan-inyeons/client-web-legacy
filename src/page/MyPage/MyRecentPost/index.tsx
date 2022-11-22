import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { MyRecentPostContainer } from "./styled";

export const MyRecentPost = ({ data }: any) => {
  const navigate = useNavigate();
  return (
    <MyRecentPostContainer>
      <div className="title">👀 나의 우연들</div>
      <div className="ImageContainer">
        {data ? (
          data.map((data: any, index: number) => (
            <div
              className="postThumb"
              key={index}
              style={{ background: `url(${data.urls.thumb})` }}
              onClick={() => navigate("/")}
            ></div>
          ))
        ) : (
          <LoadingOutlined />
        )}
      </div>
    </MyRecentPostContainer>
  );
};
