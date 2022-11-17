import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { recoil_User } from "../../../recoil";
import { USER_ROLE } from "../../../constants";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [, setUser] = useRecoilState(recoil_User.userState);

  const onSubmit = () => {
    //api 통신
    setUser({ userId: 1, role: USER_ROLE.ADMIN });
  };
  const { Title } = Typography;

  return (
    <Row align="middle" style={{ height: "100vh" }}>
      <Col xs={2} sm={4} md={6} lg={8} xl={10} />
      <Col xs={20} sm={16} md={12} lg={8} xl={4}>
        <Link to="/">
          <ArrowLeftOutlined /> 돌아가기
        </Link>
        <Title level={1}>관리자 접속</Title>
        <Form name="basic" onFinish={onSubmit} autoComplete="off">
          <Form.Item
            name="username"
            rules={[{ required: true, message: "아이디를 입력해 주세요." }]}
          >
            <Input
              placeholder="ID"
              prefix={<UserOutlined />}
              value={username}
              onChange={() => setUsername(username)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "비밀번호를 입력해 주세요" }]}
          >
            <Input.Password
              placeholder="PW"
              prefix={<LockOutlined />}
              value={password}
              onChange={() => setPassword(password)}
            />
          </Form.Item>
          <Form.Item style={{ float: "right" }}>
            <Button type="primary" htmlType="submit" shape="round" size="large">
              로그인 <ArrowRightOutlined />
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col xs={2} sm={4} md={6} lg={8} xl={10} />
    </Row>
  );
};

export default AdminLogin;
