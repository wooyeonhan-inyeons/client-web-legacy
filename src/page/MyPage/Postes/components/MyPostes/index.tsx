import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
// import { GetImages } from "../../../api";
import { GetTest } from "../TabBox/GetTest";

import { LoadingOutlined } from "@ant-design/icons";
import { PostImage } from "../../../components/PostImage";
import { PostImageContainer } from "./styled";

export const MyPostes = () => {
  const [ref, inView] = useInView();

  const { data, isError, error, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["image"],
      ({ pageParam = 0 }) => GetTest({ idx: pageParam }),
      {
        retry: 3,
        getNextPageParam: (lastPage) => {
          // lastPage: 콜백함수에서 리턴한 값을 의미한다!!
          // 직전에 받은 배열의 다음 index를 요청함
          if (lastPage[lastPage.length - 1] === undefined)
            console.log("마지막!");
          return lastPage[lastPage.length - 1].id;
          // 마지막 id 요소 관련 이벤트 처리 추가해야함
        },
      }
    );

  useEffect(() => {
    if (inView) fetchNextPage();
  });
  return (
    <PostImageContainer>
      <div className="ImageContainer">
        <>
          {data?.pages.flat().map((item, index) => (
            <PostImage url={item.url} key={index} />
          ))}
        </>

        {isFetching && (
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
