import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";

const MyRecentPostContainer = styled.div`
  width: 100vw;
  position: relative;
  left: -1rem;

  padding-top: 1rem;

  .title {
    width: 100%;
    height: 3rem;

    text-align: center;
    line-height: 3rem;
  }

  & > * {
    width: 100%;
  }
  .ImageContainer {
    display: flex;
    flex-wrap: wrap;
  }

  .postThumb {
    width: 33.3vw;
    height: 33.3vw;
    object-fit: cover;
  }
`;

export const MyRecentPost = ({ data }: any) => {
  // data.map((data: any) => console.log(data));
  return (
    <MyRecentPostContainer>
      <div className="title">👀 나의 우연들</div>
      <div className="ImageContainer">
        {data ? (
          data.map((data: any, index: number) => (
            <img className="postThumb" src={data.urls.thumb} key={index} />
          ))
        ) : (
          <LoadingOutlined />
        )}
      </div>
    </MyRecentPostContainer>
  );
};
