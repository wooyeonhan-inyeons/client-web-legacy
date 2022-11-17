import { DatePicker, Col, Row, Button, Dropdown, Space, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { useResetRecoilState } from "recoil";
import { recoil_User } from "../../../recoil";
import type { MenuProps } from 'antd';
import {useState, useEffect} from "react";
import Tables from './Table';

const AdminHome: React.FC = () => {
  
  const resetUser = useResetRecoilState(recoil_User.userState);
  const [menu, setMenu] = useState('메뉴 선택');

  const items: MenuProps['items'] = [
        {
          key: '유저 관리',
          label: '유저 관리',
        },
        {
          key: '피드 관리',
          label: '피드 관리',
        },
        {
          key: 'none',
          label: 'none',
        },
  ];

  const onClick: MenuProps['onClick'] = ({item}) => {
    console.log(item);
    
    // setMenu(key);
  };

  return (
    <>
      <Row justify="center">
        <Col flex={3}>
          <Button type="primary" onClick={resetUser}>
          로그아웃
          </Button>
        </Col>
        <Col flex={2}></Col>
      </Row>
      <Row justify="center">
      <Col span={20}>
          <Dropdown
              menu={{
              items,
              onClick,
              selectable: true,
              defaultSelectedKeys: ['3'],
              }}
          >
              <Typography.Link>
                  <Space>
                    {menu}
                    <DownOutlined />
                    </Space>
              </Typography.Link>
          </Dropdown>
      </Col>
      </Row>
      <Row  justify="center">
      <Col span={20}>
      <Tables></Tables>
      </Col>
      </Row>
    </>
);}

export default AdminHome;
