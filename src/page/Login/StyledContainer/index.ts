import styled from "styled-components";
import { COLOR } from "../../../color";

export const StyledContainer = styled.div`
  padding: 0 1rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  height: 100vh;
  max-width: 600px;

  overflow-y: hidden;

  background-color: ${COLOR.background};
  color: ${COLOR.content};
`;
