import { useState } from "react";
import { EllipsisOutlined } from '@ant-design/icons';
import {
    InputDiv,
    Input,
    Button,
    ListDiv,
    ListBox,
    List,
    IdLabel,
    ListText
  } from "../styled";
import { AvatarColor, COLOR } from "../../../constants";
import Avatar from "boring-avatars";
import TabMenu from "../Tab";

function FriendsList() {
  const [friend, setFriend] = useState("");
  const [friends, setFriends] = useState<Array<string>>([]);
  const onChange = (event : any) => setFriend(event.target.value);
  const onSubmit = (event : any) => {
    event.preventDefault();
    if (friend === "") {
      return;
    }
    setFriends((currentArray) => [friend, ...currentArray]);
    setFriend("");
  };
  return (
    <>
      <form onSubmit={onSubmit}>

        <InputDiv>
          <IdLabel>아이디</IdLabel>
          <Input
          onChange={onChange}
          value={friend}
          type="text"
          placeholder="아이디를 입력하세요"></Input>
          <Button>추가</Button>
        </InputDiv>
        <TabMenu></TabMenu>
        <ListDiv>
        <ListBox>
        {friends.map((item, index) => (
            <List key={index}>
                <Avatar
                  size={37}
                  variant="beam"
                  name={"cc"}
                  colors={AvatarColor}
                  />
                  <ListText>{item}</ListText>
                <EllipsisOutlined style={{float: "right", paddingTop: "5px"}}/>
            </List>
          ))}
        </ListBox>
        </ListDiv>
      </form>
    </>
  );
}

export default FriendsList;

