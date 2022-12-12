import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { LoadingBox } from "../../../components/LoadingContainer";
import { HEADER_FN } from "../../../constants";

import { recoil_ } from "../../../recoil";
import { postType } from "../Detail";
import { StyledDetail3 } from "../Detail/styled";
import { GetPostGroup } from "../Map/api/getPost";
import { PostCard } from "./components/postCard";

export const GroupDetail = () => {
  const [, setHeader] = useRecoilState(recoil_.headerState);
  const coordinate = useRecoilValue(recoil_.geoState);
  const [group] = useRecoilState(recoil_.groupState);

  const navigate = useNavigate();
  const [ref, inView] = useInView();

  const {
    data: groupData,
    isFetching: groupIsFetching,
    isSuccess: groupIsSuccess,
    fetchNextPage: groupfetchNextPage,
    hasNextPage: grouphasNextPage,
  } = useInfiniteQuery<postType>(
    ["/group"],
    ({ pageParam = 0 }) =>
      GetPostGroup({
        post_id: group[pageParam],
        idx: pageParam,
        lat: coordinate.lat,
        lng: coordinate.lng,
        groupLength: group.length,
      }),
    {
      retry: 3,
      getNextPageParam: (lastPage, allPages) => {
        if (group.length < allPages.length - 1) return undefined;
        return allPages.length + 1;
      },
    }
  );

  useEffect(() => {
    //모달 상태에서 스크롤 막기
    document.body.style.overflow = "hidden";
    setHeader({
      title: "게시물 모아보기",
      rightButton1: HEADER_FN.EMPTY,
      rightButton2: HEADER_FN.EMPTY,
    });
    return () => {
      document.body.style.overflow = "auto";
      setHeader({
        title: "",
        vis_goBack: false,
        rightButton1: HEADER_FN.ALARM,
        rightButton2: HEADER_FN.MYPAGE,
      });
    };
  }, [groupData]);

  useEffect(() => {
    if (inView && grouphasNextPage) groupfetchNextPage();
  }, [inView]);

  return (
    <>
      <StyledDetail3 onClick={() => navigate("/")}>
        {groupData?.pages.map((item: postType) => (
          <PostCard props={item} key={item.post_id} />
        ))}
        {/* <PostCard /> */}
        <div style={{ width: "100vw", height: "5rem" }} ref={ref}></div>
      </StyledDetail3>
    </>
  );
};
