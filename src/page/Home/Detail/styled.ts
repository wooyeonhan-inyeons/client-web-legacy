import styled from "styled-components";
import { zIndex } from "../../../constants";

export const StyledDetail = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #00000094;
  position: fixed;
  z-index: ${zIndex.middle};
  backdrop-filter: blur(3px);
  padding-top: 7rem;
  overflow-y: scroll;

  .postContainer {
    width: 90%;
    max-width: 500px;
    min-contentheight: 500px;
    color: #fff;
    background: #2f3642;
    border-radius: 1rem;
    margin: 0 auto;
    margin-bottom: 3rem;

    overflow: hidden;
  }

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ffffff80; /*스크롤바의 색상*/
  }

  .background {
    width: 100%;
    aspect-ratio: auto 1 / 1;

    background-position: center !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
  }
  .img_container {
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    overflow: hidden;
  }
  .post_img {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translate(0, -50%);
    position: absolute;
  }
  .actionSpace {
    width: 100%;
    padding: 0.5rem;
  }
  .actionSpace .emotions {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .actionSpace .emotions .divider {
    width: 1px;
    height: 1rem;
    background-color: #dddddd3d;
  }

  .actionSpace .emotions .emotionButton {
    font-size: 1.2rem;
    padding: 0.5rem 2rem;
    border-radius: 0.5rem;
    text-align: center;
    cursor: pointer;
  }

  .actionSpace .emotions .emotionButton:hover {
    background-color: #ffffff3b;
  }
  .actionSpace .emotions .emotionCount {
    font-size: 0.7rem;
  }

  .content {
    min-height: 5rem;
    padding: 1rem;
    border-bottom: 1px solid #dddddd3d;
  }
  .content .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
  }

  .content .header .title {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    font-size: 1.2rem;
  }

  .content .header .HederAction {
    cursor: pointer;
    width: 1.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
  }
  .content .header .HederAction:hover {
    background-color: #ffffff24;
    border-radius: 50%;
  }

  .PostInfo {
    display: flex;
    gap: 0.5rem;
    color: #ddd;
  }

  .PostInfo > div {
    display: inline-block;
    font-size: 0.7rem;
    padding-top: 1rem;
  }
  .postContainer .background {
    display: flex;
    justify-content: space-between;
    flex-direction: column-reverse;
    align-content: flex-end;
    align-items: flex-end;
  }
  .postContainer .background .friendStateLight {
    width: 2rem;
    height: 2rem;
    background-color: #62ce60;
    box-shadow: 0 0 10px #70ff70c4;
    border-radius: 50%;

    position: relative;
    float: right;
    margin: 1rem;
  }
  .postContainer .background .friendStateTag {
    height: 2rem;
    line-height: 2rem;
    padding: 0 1rem;
    background-color: #62ce60;
    display: inline-block;
    font-size: 0.75rem;

    position: relative;
    float: right;
    margin: 1rem;
  }

  .postContainer .background .friendStateTag > * {
    margin-right: 0.75rem;
  }
`;
