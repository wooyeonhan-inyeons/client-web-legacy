import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";

import { LoadingOutlined } from "@ant-design/icons";
import { PostImage } from "../../../components/PostImage";
import { PostImageContainer } from "../../components/MyPostes/styled";
import { GetPostMine } from "../../../api/GetPostMine";
import { LoadingBox } from "../../../../../components/LoadingContainer";

export const MyPostes = () => {
  const [ref, inView] = useInView();

  const {
    data: myData,
    isFetching: myIsFetching,
    isSuccess: myIsSuccess,
    fetchNextPage: myfetchNextPage,
    hasNextPage: myHasNextPage,
  } = useInfiniteQuery(
    ["mypage/mypost"],
    ({ pageParam = 0 }) => GetPostMine({ idx: pageParam }),
    {
      retry: 3,
      getNextPageParam: (lastPage, allPages) => {
        if (
          lastPage[lastPage.length - 1]?.statusCode === 500 ||
          allPages.flat().length !== 15
        )
          return null;
        return Math.floor((1 + allPages.flat().length) / 15);
      },
      onSuccess(data) {
        console.log(data);
      },
    }
  );

  useEffect(() => {
    if (inView && myHasNextPage) myfetchNextPage();
  });

  if (!myData || !myIsSuccess) return <LoadingBox />;
  return (
    <PostImageContainer>
      <div className="ImageContainer">
        <>
          {myData.pages.flat().map((item: any, index: number) => (
            <PostImage url={item.img_url} key={index} post_id={item.post_id} />
          ))}
        </>

        {myIsFetching && (
          <div
            style={{
              width: "100%",
              padding: "2rem 0",
              textAlign: "center",
            }}
          >
            <LoadingOutlined />
          </div>
        )}
        <div style={{ width: "100vw", height: "1rem" }} ref={ref}></div>
        {/* 이거 보이면 실행 */}
      </div>
    </PostImageContainer>
  );
};
