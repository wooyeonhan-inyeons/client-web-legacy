import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { StyledContainer } from "../../components/StyledContainer";
import { useQuery } from "react-query";
import FriendsList from "./FriendsList";
import RequestFriend from "./RequestedFriend";
import styled from "styled-components";
import { COLOR } from "../../constants";
import { getSum } from "./api";
import { useRecoilState } from "recoil";
import { friendCountState, requestedCountState } from "../../recoil/friend";
import ScrollToTop from "../../components/Scroll";

const TabBtn = styled.button<{ toggle: boolean }>`
  width: 50%;
  height: 3em;
  background-color: ${COLOR.background};
  font-family: inherit;
  border: none;
  /* border: solid 2px; */
  margin-bottom: 1.5em;
  color: ${(props) => (props.toggle ? "white" : "#A2A2A2")};
`;

const Num = styled.span`
  font-family: inherit;
  color: inherit;
  font-size: inherit;
`;

const FriendsPage = () => {
  const [tabList, setTabList] = useState(true);
  const [tabRequest, setTabRequest] = useState(false);
  const [numFr, setNumFr] = useRecoilState(friendCountState);
  const [numRe, setNumRe] = useRecoilState(requestedCountState);

  const onClick = () => {
    setTabList((prev) => !prev);
    setTabRequest((prev) => !prev);
  };

  useEffect(() => {
    getSum().then((res: any) => {
      setNumFr(res.friend_count);
      setNumRe(res.request_count);
      console.log(res);
    });
  }, []);

  return (
    <>
      <ScrollToTop />

      <Header title="친구" />
      <StyledContainer>
        <TabBtn toggle={tabList} onClick={onClick}>
          나의 친구 목록
          <Num> ({numFr})</Num>
        </TabBtn>
        <TabBtn toggle={tabRequest} onClick={onClick}>
          친구 요청
          <Num> ({numRe})</Num>
        </TabBtn>
        {tabList ? (
          <FriendsList></FriendsList>
        ) : (
          <RequestFriend></RequestFriend>
        )}
      </StyledContainer>
    </>
  );
};

export default FriendsPage;
