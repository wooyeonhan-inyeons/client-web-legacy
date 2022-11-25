import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { recoil_ } from "../../../../recoil";
import { PostImage } from "../../PostImage";
import { CarouselBox, MyPostContainer } from "./styled";
import { ActiveStyle } from "./styled";

export const Carousel = () => {
  const [posts, setPosts] = useState<
    Array<{
      key: number;
      value: number;
    }>
  >([]);
  const [tab] = useRecoilState(recoil_.tabState);
  const target = useRef(null);
  const [isFully, setIsFully] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  let idx = Number.MAX_SAFE_INTEGER;

  const onIntersect = ([entry]: any, observer: any) => {
    // idx가 마지막값 이하로 못가게 막아야함.
    // 어떻게 받을진 모르겠지만 N 번 idx 이하의 M 개 가져오기
    // idx는 response 값 마지막의 idx로 재설정
    if (entry.isIntersecting && !scrolling && idx > 0 && !isFully) {
      observer.unobserve(entry.target);

      setPosts((prev) => [...prev, ...[{ key: idx, value: idx }]]);
      idx--;

      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer: any;
    if (target) {
      // callback 함수, option
      observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
      observer.observe(target.current); // 타겟 엘리먼트 지정
    }
    return () => {
      observer && observer.disconnect();
    };
  }, [target]);

  return (
    <>
      <CarouselBox style={ActiveStyle(tab)}>
        <MyPostContainer>
          <div className="ImageContainer">
            {posts.map((post, index) => (
              <PostImage url={post.value.toString()} />
            ))}

            <div style={{ width: "100wv", height: "1rem" }} ref={target}></div>
            {/* 이거 보이면 실행 */}
          </div>
        </MyPostContainer>
      </CarouselBox>
    </>
  );
};
