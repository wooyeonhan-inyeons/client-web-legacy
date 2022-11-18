import React, { useState } from "react";
import { Button, Col, Form, Input, message, Row, Typography } from "antd";
import {
  ArrowLeftOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";

import { recoil_User } from "../../../recoil";
import { USER_ROLE } from "../../../constants";
import { GetAdmin } from "./api";
import { useMutation } from "react-query";

const AdminLogin = () => {
  const [, setUser] = useRecoilState(recoil_User.userState);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [submitLoding, setSubmitLoding] = useState(false);

  const { mutate } = useMutation(GetAdmin, {
    onMutate: () => {
      //시작
      setSubmitLoding(true);
    },
    onError: (error: Error) => {
      console.log("onError", error);
      message.error(error.message + " 😕");
    },
    onSuccess: () => {
      message.success("로그인에 성공하였습니다. 😀");
      setUser({ userId: 0, role: USER_ROLE.ADMIN });
    },
    onSettled: () => {
      //종료
      setSubmitLoding(false);
    },
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const value = e.target.value;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const { Title } = Typography;

  return (
    <Row align="middle" style={{ height: "100vh" }}>
      <Col xs={2} sm={4} md={6} lg={8} xl={10} />
      <Col xs={20} sm={16} md={12} lg={8} xl={4}>
        <Link to="/" style={{ display: "block", marginBottom: "1.5rem" }}>
          <ArrowLeftOutlined /> 돌아가기
        </Link>
        <Title level={1}>관리자 접속</Title>
        <Form
          name="basic"
          onFinish={() =>
            mutate({ username: form.username, password: form.password })
          }
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "아이디를 입력해 주세요." }]}
          >
            <Input
              name="username"
              placeholder="ID"
              prefix={<UserOutlined />}
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "비밀번호를 입력해 주세요" }]}
          >
            <Input.Password
              name="password"
              placeholder="PW"
              prefix={<LockOutlined />}
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item style={{ float: "right" }}>
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              size="large"
              style={{ minWidth: "100px" }}
              loading={submitLoding}
            >
              로그인
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col xs={2} sm={4} md={6} lg={8} xl={10} />
    </Row>
  );
};

export default AdminLogin;
