import styled from "styled-components";
export const MyRecentPostContainer = styled.div`
  width: 100vw;
  max-width: 600px;
  position: relative;
  transform: translate(-50%, 0);
  left: 50%;
  padding-top: 1rem;

  .title {
    width: 100%;
    height: 3rem;

    text-align: center;
    line-height: 3rem;
  }

  .ImageContainer {
    display: flex;
    flex-wrap: wrap;
    gap: 0.05%;
  }

  .postThumb {
    width: 33.3vw;
    max-width: 33.3%;
    aspect-ratio: auto 1 / 1;
    background-position: center !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    cursor: pointer;
  }

  .postThumb:hover {
    filter: brightness(0.7);
  }

  .morePost::after {
    content: "더보기";
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #000000a1;
    backdrop-filter: blur(7px);
  }
`;
