import styled from "styled-components";
import { COLOR, zIndex } from "../../../../../constants";

export const StyledDialog = styled.div`
  width: 100%;
  height: 100vh;
  color: #fff;
  background-color: #00000094;
  backdrop-filter: blur(3px);
  box-shadow: 2px 6px 7px #0000004a;

  position: fixed;
  top: 0;
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;

  .dialogContainer {
    width: 70%;
    border-radius: 0.5rem;
    overflow: hidden;
    background-color: ${COLOR.background};
  }

  .dialogContainer div {
    height: 3.5rem;
    line-height: 3.5rem;
    text-align: center;
  }
  .dialogContainer div.button {
    cursor: pointer;
  }
  .dialogContainer div.button:hover {
    background-color: #ffffff1f;
  }

  .dialogContainer div:nth-last-child(n + 2) {
    border-bottom: 1px solid #dddddd3d;
  }
`;
