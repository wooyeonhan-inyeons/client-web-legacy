import styled from "styled-components";
import { COLOR, zIndex } from "../../../constants";

export const StyledWriteContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #263145;
  padding: 4rem 1rem;
  color: #fff;
  overflow-y: scroll;

  .inputSection {
    margin-bottom: 1.5rem;
  }
  .inputSection .subHead {
    font-weight: bolder;
    font-size: 2rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  .inputSection textarea {
    width: 100%;
    background: none;
    outline: none !important;
    padding: 1rem;
    resize: none;
    height: 10rem;

    border: 1px solid #fff;
    border-radius: 1rem;
  }

  .inputSection label {
    width: 100%;
    max-width: 400px;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    display: block;
    margin: 2rem auto;
    border-radius: 1rem;

    cursor: pointer;

    color: #222;
    background-color: ${COLOR.secondary};
    box-shadow: 0px 6px 10px 0px #00000030;
  }
  .inputSection label:hover {
    background-color: #d2ab1c;
  }
  .inputSection input {
    display: none;
  }
  .previewContainer {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    gap: 1rem;
    padding: 1.5rem 0;
  }
  .previewContainer img {
    height: 8rem;
    box-shadow: 0px 6px 10px 0px #00000030;
    cursor: pointer;
    border-radius: 0.5rem;
  }
  .previewContainer img:hover {
    filter: brightness(0.7);
  }
  .noti {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 1rem;
    background-color: #ffffff29;
    padding: 1rem;
    border-radius: 0.5rem;
  }
  .noti .divider {
    width: 1px;
    height: 1rem;
    background-color: #ffffff40;
  }
  .inputSection.submit {
    display: flex;
    justify-content: space-around;
  }
  .inputSection .button {
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    display: inline-block;
    border-radius: 1rem;
  }
  .inputSection .button.submit {
    width: 80%;
    max-width: 400px;

    cursor: pointer;

    color: #222;
    background-color: #fff;
    box-shadow: 0px 6px 10px 0px #00000030;
  }
`;
