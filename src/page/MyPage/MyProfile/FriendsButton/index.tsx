import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLOR } from "../../../../constants";

const FriendsButtonContainer = styled.div`
  width: 30%;
  height: 5rem;
  border-radius: 1rem;

  font-weight: bold;
  line-height: 5rem;
  text-align: center;

  background-color: ${COLOR.secondary};

  // background: linear-gradient(145deg, #222c3e, #29344a);
  box-shadow: 0.7rem 0.7rem 0.7rem #202a3b, -0.7rem -0.5rem 0.7rem #2c384fc4;

  cursor: pointer;
  &:hover {
    opacity: 0.8;
    box-shadow: 0.5rem 0.5rem 0.5rem #202a3bd9, -0.5rem -0.5rem 0.5rem #2c384f6e;
  }

  @media (max-width: 351px) {
    font-size: 0.7rem;
  }
`;
export const FriendsButton = ({ onClick }: any) => {
  return (
    <FriendsButtonContainer onClick={onClick}>친구목록</FriendsButtonContainer>
  );
};
