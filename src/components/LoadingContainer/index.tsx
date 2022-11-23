import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";

const LoadingContainer = styled.div`
  height: 100vh;
  max-width: 600px;
  padding: 0 1rem;
  padding-top: 4rem;
  font-size: 6rem;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
`;

export const LoadingBox = () => {
  return (
    <LoadingContainer>
      <LoadingOutlined />
    </LoadingContainer>
  );
};
