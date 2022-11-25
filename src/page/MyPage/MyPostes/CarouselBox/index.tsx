import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { useRecoilState } from "recoil";
import { recoil_ } from "../../../../recoil";
import { GetImages, GetUserExperience, UserInfoProp } from "../../api";

import { PostImage } from "../../PostImage";
import { CarouselBox, MyPostContainer } from "./styled";
import { ActiveStyle } from "./styled";

export const Carousel = () => {
  const [posts, setPosts] = useState<Array<{ key: number; value: number }>>([]);
  const [posts2, setPosts2] = useState<any>([]);
  const [tab] = useRecoilState(recoil_.tabState);
  const target = useRef(null);
  const [ref, inView] = useInView();
  let idx = Number.MAX_SAFE_INTEGER;

  const { data, error, isFetching, fetchNextPage } = useInfiniteQuery(
    ["image"],
    GetUserExperience,
    {
      getNextPageParam: (lastPage, pages) => {
        // lastPage와 pages는 콜백함수에서 리턴한 값을 의미한다!!
        // lastPage: 직전에 반환된 리턴값, pages: 여태 받아온 전체 페이지
        if (lastPage) return lastPage[0];
        // 마지막 페이지면 undefined가 리턴되어서 hasNextPage는 false가 됨!
        return undefined;
      },
      onSuccess: (response) => {
        console.log(response);
        // setPosts((prev) => [...prev, ...[{ key: idx, value: idx }]]);
        // setPosts2((prev: any) => [...prev, ...[123]]);
      },
    }
  );

  useEffect(() => {
    fetchNextPage();
  }, [inView]);

  return (
    <>
      <CarouselBox style={ActiveStyle(tab)}>
        <MyPostContainer>
          <div onClick={() => console.log("이것은 !!", data?.pages)}>
            이것은!!!
          </div>
          <div className="ImageContainer">
            {/* {posts.map((post, index) => (
              <PostImage url={post.value.toString()} key={index} />
            ))} */}

            {data?.pages.map((post, index) => (
              <PostImage key={index} />
            ))}
            <div style={{ width: "100vw", height: "110vh" }}></div>
            <div style={{ width: "100vw", height: "1rem" }} ref={ref}></div>
            {/* 이거 보이면 실행 */}
          </div>
        </MyPostContainer>
      </CarouselBox>
    </>
  );
};
