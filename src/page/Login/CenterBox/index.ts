import styled from "styled-components";
import { COLOR } from "../../../constants";

export const CenterBox = styled.div`
  padding: 0 1rem;
  margin: 0 auto;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-evenly;

  height: 100vh;
  max-width: 600px;

  overflow: hidden;

  background-color: ${COLOR.background};
  color: ${COLOR.content};
`;
