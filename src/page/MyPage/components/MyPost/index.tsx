import { MyPostContainer_Center } from "./styled";
import { PostImage } from "../PostImage";

export const MyPost = ({ data }: any) => {
  const maxIndex = 9;

  const PostList = data.map((data: any, index: number) => {
    if (index < maxIndex - 1) {
      return (
        <PostImage url={data.img_url} post_id={data.post_id} key={index} />
      );
    }
  });

  return (
    <MyPostContainer_Center>
      <div className="title">👀 나의 우연들</div>
      <div className="ImageContainer">
        {data && PostList}
        <PostImage
          url={data[maxIndex - 1].img_url}
          post_id={data.post_id}
          morePost={true}
        />
      </div>
    </MyPostContainer_Center>
  );
};
