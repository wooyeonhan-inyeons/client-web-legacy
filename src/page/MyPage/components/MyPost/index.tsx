import { MyPostContainer_Center } from "./styled";
import { PostImage } from "../PostImage";
import { useState, useEffect } from "react";

export const MyPost = ({ data }: any) => {
  const maxIndex = 9;
  const currIndex = data.length;

  const [more, setMore] = useState(false);
  console.log("ㅇㅇ ", currIndex);

  const PostList = data.map((data: any, index: number) => {
    if (index < maxIndex - 1) {
      return (
        <PostImage url={data.img_url} post_id={data.post_id} key={index} />
      );
    }
  });

  const setState = () => {
    if (currIndex > maxIndex) {
      setMore(true);
      console.log("실행됨");
    }
  };
  useEffect(() => {
    setState();
  }, []);

  return (
    <MyPostContainer_Center>
      <div className="title">👀 나의 우연들</div>
      <div className="ImageContainer">
        {data && PostList}
        <PostImage
          url={data[maxIndex - 1]?.img_url}
          post_id={data.post_id}
          morePost={more}
        />
      </div>
    </MyPostContainer_Center>
  );
};
