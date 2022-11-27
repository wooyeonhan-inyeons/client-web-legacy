import {
  DatePicker,
  Col,
  Row,
  Button,
  Dropdown,
  Space,
  Typography,
  Select,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import React from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { useResetRecoilState } from "recoil";
import { recoil_User } from "../../../recoil";
import { useState, useEffect } from "react";
import UserTable from "./UserTable";
import { useRef } from "react";
import FriendsTable from "./FriendTable";

const AdminHome: React.FC = () => {
  const resetUser = useResetRecoilState(recoil_User.userState);
  const [menu, setMenu] = useState("user");

  const handleChange = (value: string) => {
    setMenu(value);
  };

  const tableMap = useRef<any>({
    user: <UserTable />,
    friends: <FriendsTable />,
  });

  return (
    <>
      <Row justify="center">
        <Col
          span={20}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "1rem",
          }}
        >
          <Button type="primary" onClick={resetUser}>
            로그아웃
          </Button>
        </Col>
      </Row>
      <Row justify="center">
        <Col
          span={20}
          style={{
            margin: "1rem 0 ",
          }}
        >
          <Select
            defaultValue="user"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              {
                value: "user",
                label: "user",
              },
              {
                value: "friends",
                label: "friends",
              },
              // {
              //   value: "posting",
              //   label: "posting",
              // },
            ]}
          />
        </Col>
      </Row>
      <Row justify="center">
        <Col span={20}>{tableMap.current[menu]}</Col>
      </Row>
    </>
  );
};

export default AdminHome;
