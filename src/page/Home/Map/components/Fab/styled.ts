import styled from "styled-components";
import { zIndex } from "../../../../../constants";

export const StyledFab = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: #e3b719;
  font-size: 1.4rem;
  color: #ffffffc9;

  position: fixed;
  bottom: 2rem;
  right: 5%;
  line-height: 3.5rem;
  text-align: center;
  box-shadow: 0px 6px 10px 0px #00000030;
  cursor: pointer;

  z-index: ${zIndex.background};

  &:hover {
    background-color: #d2ab1c;
  }
`;
