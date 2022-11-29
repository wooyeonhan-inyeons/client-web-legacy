import styled from "styled-components";
import { ReactComponent as Spinner } from "./tail-spin.svg";

const LoadingContainer = styled.div`
  height: 100vh;
  max-width: 600px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
`;

export const LoadingBox = () => {
  return (
    <LoadingContainer>
      <Spinner width="6rem" height="6rem" />
    </LoadingContainer>
  );
};
