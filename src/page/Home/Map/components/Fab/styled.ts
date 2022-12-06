import styled from "styled-components";
import { zIndex } from "../../../../../constants";

export const StyledFab = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: #e3b719;
  font-size: 1.3rem;
  color: #ffffffc9;

  position: fixed;
  bottom: 2rem;
  right: 5%;
  line-height: 3.5rem;
  text-align: center;

  z-index: ${zIndex.background};

  filter: drop-shadow(0px 159px 63px rgba(23, 35, 53, 0.01))
    drop-shadow(0px 89px 54px rgba(23, 35, 53, 0.5))
    drop-shadow(0px 40px 40px rgba(23, 35, 53, 0.5))
    drop-shadow(0px 10px 22px rgba(23, 35, 53, 0.5))
    drop-shadow(0px 0px 0px rgba(23, 35, 53, 0.5));

  cursor: pointer;

  &:hover {
    background-color: #d2ab1c;
  }
`;
