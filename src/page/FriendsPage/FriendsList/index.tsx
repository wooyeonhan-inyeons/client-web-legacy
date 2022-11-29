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
  ListText,
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
      console.log(res);
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
            {friends.map((item, index) => (
              <List key={index}>
                <Avatar
                  size={37}
                  variant="beam"
                  name={"cc"}
                  colors={AvatarColor}
                />
                <ListText>{item}</ListText>
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
