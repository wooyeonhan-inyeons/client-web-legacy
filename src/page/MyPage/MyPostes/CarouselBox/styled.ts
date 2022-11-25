import styled from "styled-components";
import { MYPAGE_ } from "../../../../constants";
export const MyPostContainer = styled.div`
  width: 100vw;
  max-width: 600px;
  position: relative;
  // transform: translate(-50%, 0);
  // left: 50%;
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
    justify-content: space-between;
  }

  .postThumb {
    width: 33.3vw;
    max-width: 33.3%;
    aspect-ratio: auto 1 / 1;
    background-position: center !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    cursor: pointer;
    font-size: 0;
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
    font-size: 1rem;

    background-color: #000000a1;
    backdrop-filter: blur(7px);
  }
`;

export const CarouselBox = styled.div`
  width: 200%;
  position: absolute;

  transition: all ease-in-out 0.5s;
`;

export const ActiveStyle = (state: MYPAGE_) => {
  let value;
  switch (state) {
    case MYPAGE_.VISITED_POST:
      value = "-100%";
      break;
    case MYPAGE_.MY_POST:
      value = "0%";
  }
  return { left: value };
};
