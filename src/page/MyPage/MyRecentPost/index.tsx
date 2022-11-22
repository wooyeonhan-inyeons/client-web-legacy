import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MyRecentPostContainer = styled.div`
  width: 100vw;
  max-width: 600px;
  position: relative;
  transform: translate(-50%, 0);
  left: 50%;
  padding-top: 1rem;

  .title {
    width: 100%;
    height: 3rem;

    text-align: center;
    line-height: 3rem;
  }

  .ImageContainer {
    display: flex;
    flex-wrap: wrap;
    gap: 0.05%;
  }

  .postThumb {
    width: 33.3vw;
    max-width: 33.3%;
    aspect-ratio: auto 1 / 1;
    background-position: center !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    cursor: pointer;
  }

  .postThumb:hover {
    filter: brightness(0.7);
  }
`;

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
