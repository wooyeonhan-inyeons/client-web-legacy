import { useEffect, useState } from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import {
  InputDiv,
  Input,
  Button,
  ListDiv,
  ListBox,
  List,
  IdLabel,
  FriendName,
  FriendMessage
} from "../styled";
import { AvatarColor, COLOR } from "../../../constants";
import Avatar from "boring-avatars";
import TabMenu from "../Tab";
import { getFriends } from "./../api";
import { useQuery } from "react-query";

function FriendsList() {
  const [friendInput, setFriendInput] = useState("");
  const [friends, setFriends] = useState([]);
  const onChange = (event: any) => setFriendInput(event.target.value);
  const onSubmit = (event: any) => {};

  useEffect(() => {
    getFriends().then((res) => {
      const follower = res.follower.map((data: any) => ({
        friend_id: data.friend_id,
        user_info: data.follower,
      }));
      const following = res.following.map((data: any) => ({
        friend_id: data.friend_id,
        user_info: data.following,
      }));
      const result: any = [...follower, ...following];
      setFriends(result);
    });
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <InputDiv>
          <IdLabel>아이디</IdLabel>
          <Input
            onChange={onChange}
            value={friendInput}
            type="text"
            placeholder="아이디를 입력하세요"
          ></Input>
          <Button>추가</Button>
        </InputDiv>
        <TabMenu></TabMenu>
        <ListDiv>
          <ListBox>
            {friends.map((item: any, index) => (
              <List key={index}>
                <Avatar
                  size={37}
                  variant="beam"
                  name={"cc"}
                  colors={AvatarColor}
                />
                <FriendName>{item.user_info.name}</FriendName>
                <FriendMessage>{item.user_info.message}</FriendMessage>
                <EllipsisOutlined
                  style={{ float: "right", paddingTop: "5px" }}
                />
              </List>
            ))}
          </ListBox>
        </ListDiv>
      </form>
    </>
  );
}

export default FriendsList;
