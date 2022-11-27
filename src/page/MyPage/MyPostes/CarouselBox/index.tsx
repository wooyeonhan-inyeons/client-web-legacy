import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { useRecoilState } from "recoil";
import { recoil_ } from "../../../../recoil";
import { GetImages } from "../../api";

import { PostImage } from "../../PostImage";
import { CarouselBox, MyPostContainer } from "./styled";
import { ActiveStyle } from "./styled";
import { GetTest, TestType } from "./GetTest";

export const Carousel = () => {
  const [posts, setPosts] = useState<Array<TestType>>([]);
  const [tab] = useRecoilState(recoil_.tabState);
  const target = useRef(null);
  const [ref, inView] = useInView();
  let idx = Number.MAX_SAFE_INTEGER;
  const [idx2, setIdx] = useState(0);
  const { data, error, isFetching, fetchNextPage } = useInfiniteQuery(
    ["image"],
    () => GetTest({ idx: idx2 }),
    {
      getNextPageParam: (lastPage) => {
        // lastPage와 pages는 콜백함수에서 리턴한 값을 의미한다!!
        // lastPage: 직전에 반환된 리턴값, pages: 여태 받아온 전체 페이지
        return lastPage;
        // 마지막 페이지면 undefined가 리턴되어서 hasNextPage는 false가 됨!
        // return undefined;
      },
      onSuccess: (response) => {
        console.log(response);
        // setPosts((prev) => [...prev, ...[{ key: idx, value: idx }]]);
        setPosts((prev) => [...prev, ...response.pages.flat()]);
        // setPosts((prev: any) => [...prev, ...response.pages.flat()]);
        setIdx((prev) => prev + 3);
      },
    }
  );

  const newArray = data?.pages.flat();
  useEffect(() => {
    // while (!inView) fetchNextPage();
    fetchNextPage();
    // console.log("NEWONE", newArray);
    // setPosts(newArray);
  }, [inView]);

  return (
    <>
      <CarouselBox style={ActiveStyle(tab)}>
        <MyPostContainer>
          <div onClick={() => console.log("DATA: ", data)}>DATA</div>

          <div onClick={() => console.log("DATA(flat): ", data?.pages.flat())}>
            DATA 보기 (faltting)
          </div>
          <div onClick={() => console.log("posts: ", posts)}>POSTS</div>
          <div className="ImageContainer">
            <>
              {posts?.map((post, index) => (
                <PostImage url={post.url} key={index} />
              ))}
              {/* {newArray?.map((item, index) => (
                <PostImage url={item.url} key={index} />
              ))} */}
            </>

            {isFetching && "loading..."}
            <PostImage />
            <div style={{ width: "100vw", height: "110vh" }}></div>
            <div style={{ width: "100vw", height: "1rem" }} ref={ref}></div>
            {/* 이거 보이면 실행 */}
          </div>
        </MyPostContainer>
      </CarouselBox>
    </>
  );
};
