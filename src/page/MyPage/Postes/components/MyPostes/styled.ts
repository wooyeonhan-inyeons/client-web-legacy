import styled from "styled-components";
import { zIndex } from "../../../../../constants";
export const PostImageContainer = styled.div`
  width: 100vw;
  height: 100%;
  max-width: 600px;
  position: relative;

  padding-top: 2.5rem;
  z-index: ${zIndex.background};
  overflow-y: scroll;

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
    justify-content: flex-start;
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
    /* align-items: center; */
    /* justify-content: center; */
    font-size: 1rem;

    background-color: #000000a1;
    backdrop-filter: blur(7px);
  }
`;
