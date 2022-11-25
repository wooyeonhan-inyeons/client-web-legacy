import { useNavigate } from "react-router-dom";
import { MyRecentPostContainer } from "./styled";

interface PostProps {
  url?: string;
  morePost?: boolean;
}

const PostImage = ({ url, morePost }: PostProps) => {
  const navigate = useNavigate();
  if (morePost) {
    return (
      <div
        className="postThumb morePost"
        style={{ background: `url(${url})` }}
        onClick={() => navigate("/mypage/postes")}
      ></div>
    );
  } else {
    return (
      <div
        className="postThumb"
        style={{ background: `url(${url})` }}
        onClick={() => navigate("/")}
      ></div>
    );
  }
};
export const MyRecentPost = ({ data }: any) => {
  console.log(Object.keys(data).length);
  const maxIndex = Math.floor(Object.keys(data).length / 3) * 3;
  const PostList = data.map((data: any, index: number) => {
    if (index < maxIndex - 1) {
      return <PostImage url={data.urls.thumb} key={index} />;
    }
  });

  return (
    <MyRecentPostContainer>
      <div className="title">👀 나의 우연들</div>
      <div className="ImageContainer">
        {data && PostList}
        <PostImage url={data[maxIndex - 1].urls.thumb} morePost={true} />
      </div>
    </MyRecentPostContainer>
  );
};
