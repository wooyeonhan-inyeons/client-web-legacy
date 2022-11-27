import styled from "styled-components";

const MyPostButtonContainer = styled.div`
  width: 65%;
  height: 5rem;
  border-radius: 1rem;
  padding: 1rem;
  gap: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(145deg, #dddddd, #ffffff);
  color: #2a2a2a;
  box-shadow: 0.7rem 0.7rem 0.7rem #202a3b, -0.7rem -0.5rem 0.7rem #2c384fc4;

  cursor: pointer;
  &:hover {
    background: linear-gradient(145deg, #ddddddd9, #ffffffd9);
    box-shadow: 0.5rem 0.5rem 0.5rem #202a3bd9, -0.5rem -0.5rem 0.5rem #2c384f6e;
  }

  @media (max-width: 351px) {
    gap: 0.3rem;
    font-size: 0.7rem;
  }
`;

const MyPostImages = styled.div`
  display: flex;

  & > .images {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    display: inline-block;
    overflow: hidden;
    font-size: infinite;

    background-color: #d9d9d9;
    box-shadow: 0.3rem 0.5rem 0.8rem #0000004f;
  }

  & > .images:nth-child(n + 2) {
    margin-left: -10px;
  }
  & > .images img {
    width: 100%;
    height: 100%;
  }

  & > .images.another {
    text-align: center;
  }
`;

interface ImageURL {
  url1?: string;
  url2?: string;
  onClick?: () => void;
}

export const MyPostButton = ({ url1, url2, onClick }: ImageURL) => {
  return (
    <MyPostButtonContainer onClick={onClick}>
      <div>최근에 발견한 우연들</div>
      <MyPostImages>
        {url1 && (
          <div className="images one">
            <img src={url1} />
          </div>
        )}
        {url2 && (
          <div className="images two">
            <img src={url2} />
          </div>
        )}
        <div className="images another">···</div>
      </MyPostImages>
    </MyPostButtonContainer>
  );
};
