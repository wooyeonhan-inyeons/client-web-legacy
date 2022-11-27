import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { useRecoilState } from "recoil";
import { recoil_ } from "../../../../recoil";
import { GetImages } from "../../api";

import { LoadingOutlined } from "@ant-design/icons";
import { PostImage } from "../../PostImage";
import { CarouselBox, MyPostContainer } from "./styled";
import { ActiveStyle } from "./styled";
import { GetTest } from "./GetTest";

export const Carousel = () => {
  const [tab] = useRecoilState(recoil_.tabState);
  const [ref, inView] = useInView();

  const { data, error, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["image"],
      ({ pageParam = 0 }) => GetTest({ idx: pageParam }),
      {
        retry: 3,
        getNextPageParam: (lastPage) => {
          // lastPage: 콜백함수에서 리턴한 값을 의미한다!!
          // 직전에 받은 배열의 다음 index를 요청함
          return lastPage[lastPage.length - 1].id;
        },
        onSuccess: () => {
          console.log("hasNextPage", hasNextPage);
          // while (!inView && hasNextPage) console.log("이거 맞냐");
          if (inView) {
            // console.log("왜 아직도 보이세요", hasNextPage);
            // fetchNextPage();
          }
        },
      }
    );

  useEffect(() => {
    if (inView) fetchNextPage();
  });

  return (
    <>
      <CarouselBox style={ActiveStyle(tab)}>
        <MyPostContainer>
          <button onClick={() => console.log(data?.pages.flat())}>DATA</button>
          <button onClick={() => console.log(inView)}>DATA</button>
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
            {/* <div style={{ width: "100vw", height: "110vh" }}></div> */}
            <div style={{ width: "100vw", height: "1rem" }} ref={ref}>
              내가 보이세요?
            </div>
            {/* 이거 보이면 실행 */}
          </div>
        </MyPostContainer>
      </CarouselBox>
    </>
  );
};
