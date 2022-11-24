import styled from "styled-components";

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem 1rem;

  @media (max-width: 351px) {
    gap: 1.5rem 0.5rem;
  }
`;

export const ProfileInfoContainer = styled.div`
  width: 100%;
  height: 5.5rem;
  border-radius: 2.75rem;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #61708a;
`;

export const ProfileLeft = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 351px) {
    gap: 0.5rem;

    & > svg {
      width: 2rem;
      // display: none;
    }
  }
`;

export const ProfileEditButton = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius 50%;

  background-color: #d5d5d5;

  cursor: pointer;

  &:hover {
    background-color: #d5d5d561;
  }

  & > * {
    display: block;
    margin: 0 auto;
    line-height: 3rem;
    color: #3a3a3a;
  }

  @media (max-width: 351px) {
    width: 2.5rem;
    height: 2.5rem;
    
    & > * {
      line-height: 2.5rem;
    }
  }
`;

export const MyProfileTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .username {
    font-weight: bold;
    font-size: 1.3rem;
  }

  @media (max-width: 351px) {
    font-size: 0.75rem;
    .username {
      font-size: 0.9rem;
    }
  }
`;

export const MyProfileInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  & > * {
    display: inline-block;
  }

  .divider {
    width: 1px;
    height: 0.7rem;
    margin: 0 0.5rem;

    background-color: #ffffff73;
  }
`;
