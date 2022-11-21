import React from "react";
import { Header, HeaderProps } from "../components/Header";
import { ComponentMeta, ComponentStory, Meta, Story } from "@storybook/react";
import { HEADER_FN } from "../constants";

export default {
  title: "Components/Header",
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const Mypage = Template.bind({});
Mypage.args = {
  title: "마이페이지",
  vis_goBack: true,
  rightButton1: undefined,
  rightButton2: undefined,
};

export const Friends = Template.bind({});
Friends.args = {
  title: "친구",
  vis_goBack: true,
  rightButton1: undefined,
  rightButton2: HEADER_FN.PULS,
};

export const Home = Template.bind({});
Home.args = {
  title: "",
  vis_goBack: false,
  rightButton1: HEADER_FN.ALARM,
  rightButton2: HEADER_FN.MYPAGE,
};
