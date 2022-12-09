import styled from "styled-components";
import { ReactComponent as Spinner } from "./tail-spin.svg";

const LoadingContainer = styled.div`
  height: 100vh;
  max-width: 600px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;

  .four-dots:before {
    display: block;
    height: 5px;
    width: 5px;
    content: "";
    -webkit-animation: spin 1s infinite;
    animation: spin 1s infinite;
    border-radius: 100%;
    -webkit-box-shadow: 20px 0 0 5px var(--primary),
      0 20px 0 5px var(--secondary), 0 -20px 0 5px var(--secondary),
      -20px 0 0 5px var(--primary);
    box-shadow: 20px 0 0 5px var(--primary), 0 20px 0 5px var(--secondary),
      0 -20px 0 5px var(--secondary), -20px 0 0 5px var(--primary);
  }

  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

export const LoadingBox = () => {
  return (
    <LoadingContainer>
      <Spinner width="6rem" height="6rem" />
    </LoadingContainer>
  );
};

export const LoadingBox2 = () => {
  return (
    <LoadingContainer>
      <div className="four-dots"></div>
    </LoadingContainer>
  );
};
