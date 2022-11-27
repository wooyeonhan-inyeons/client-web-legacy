import { MyPostContainer_Center } from "./styled";
import { PostImage } from "../PostImage";

export const MyPost = ({ data }: any) => {
  const maxIndex = Math.floor(Object.keys(data).length / 3) * 3;

  const PostList = data.map((data: any, index: number) => {
    if (index < maxIndex - 1) {
      return <PostImage url={data.url} key={index} />;
    }
  });

  return (
    <MyPostContainer_Center>
      <div className="title">👀 나의 우연들</div>
      <div className="ImageContainer">
        {data && PostList}
        <PostImage url={data[maxIndex - 1].url} morePost={true} />
      </div>
    </MyPostContainer_Center>
  );
};
