import styled from "styled-components";
import { zIndex } from "../../../constants";

export const StyledDetail = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #26314594;
  position: fixed;
  z-index: ${zIndex.middle};
  backdrop-filter: blur(3px);
  padding-top: 7rem;
  overflow-y: scroll;

  .postContainer {
    width: 90%;
    max-width: 500px;
    min-contentheight: 500px;
    background-color: #fff;
    border-radius: 1rem;
    margin: 0 auto;
    margin-bottom: 3rem;

    overflow: hidden;
  }

  .background {
    width: 100%;
    aspect-ratio: auto 1 / 1;

    background: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZAPDCyOFVU4oDRqkpRAenVtkz_sJJb42oK7UcW_FyFHTB3u1x5R-euRLaj7YjPi8c_OI&usqp=CAU");
    background-position: center !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
  }
  .actionSpace {
    width: 100%;
    padding: 0.5rem;
  }
  .actionSpace .emotions {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .actionSpace .emotions .divider {
    width: 1px;
    height: 1rem;
    background-color: #ddd;
  }

  .actionSpace .emotions .emotionButton {
    font-size: 1.2rem;
    padding: 0.5rem 2rem;
    border-radius: 0.5rem;
    text-align: center;
  }

  .actionSpace .emotions .emotionButton:hover {
    background-color: #f2f2f2;
  }
  .actionSpace .emotions .emotionCount {
    font-size: 0.9rem;
  }

  .content {
    min-height: 5rem;
    padding: 1rem;
    border-bottom: 1px solid #ddd;
  }

  .content .title {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    padding-bottom: 1rem;
    font-size: 1.2rem;
  }
`;
