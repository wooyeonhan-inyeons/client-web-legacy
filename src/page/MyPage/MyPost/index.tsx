import { MyPostContainer } from "./styled";
import { PostImage } from "../PostImage";

export const MyPost = ({ data }: any) => {
  console.log(Object.keys(data).length);
  const maxIndex = Math.floor(Object.keys(data).length / 3) * 3;
  const PostList = data.map((data: any, index: number) => {
    if (index < maxIndex - 1) {
      return <PostImage url={data.urls.thumb} key={index} />;
    }
  });

  return (
    <MyPostContainer>
      <div className="title">👀 나의 우연들</div>
      <div className="ImageContainer">
        {data && PostList}
        <PostImage url={data[maxIndex - 1].urls.thumb} morePost={true} />
      </div>
    </MyPostContainer>
  );
};
