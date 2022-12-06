import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { StyledContainer } from "../../components/StyledContainer";
import { useQuery } from "react-query";
import FriendsList from "./FriendsList";
import RequestFriend from "./RequestedFriend";
import styled from "styled-components";
import { COLOR } from "../../constants";

const TabBtn = styled.button< { toggle : boolean } >`
  width: 50%;
  height: 3em;
  background-color: ${COLOR.background};
  font-family: inherit;
  border: none;
  /* border: solid 2px; */
  margin-bottom: 1.5em;
  color: ${(props) => (props.toggle ? 'white' : '#A2A2A2')};
`

const FriendsPage = () => {
  const [tabList, setTabList] = useState(true);
  const [tabRequest, setTabRequest] = useState(false);
  const onClick = () => {
    setTabList(prev => !prev);
    setTabRequest(prev => !prev);
  }
  return (
    <>
      <Header title="친구" />
      <StyledContainer>
        <TabBtn 
        toggle={tabList}
        onClick={onClick}
        >나의 친구 목록</TabBtn>
        <TabBtn 
        toggle={tabRequest}
        onClick={onClick}
        >친구 요청</TabBtn>
        { tabList ?
        <FriendsList></FriendsList> : 
        <RequestFriend></RequestFriend>}
      </StyledContainer>
    </>
    );
  };
  
  export default FriendsPage;