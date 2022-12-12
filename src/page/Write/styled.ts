import styled from "styled-components";
import { COLOR, zIndex } from "../../constants";

export const StyledWriteContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #263145;
  padding: 4.5rem 1rem;
  color: #fff;
  overflow-y: scroll;

  .inputSection {
    margin-bottom: 1.5rem;
  }
  .inputSection.options {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .inputSection .subHead {
    font-weight: bolder;
    font-size: 2rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  .inputSection textarea {
    width: 100%;
    background-color: ${COLOR.background};
    outline: none !important;
    padding: 1rem;
    resize: none;
    height: 10rem;

    border: 1px solid #fff;
    border-radius: 0.5rem;
  }

  .inputSection .attach {
    width: 90%;
    max-width: 400px;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    display: block;
    margin: 0 auto;
    border-radius: 0.5rem;

    cursor: pointer;

    color: #222;
    background-color: ${COLOR.secondary};
    box-shadow: 0px 6px 10px 0px #00000030;
  }
  .inputSection .attach:hover {
    background-color: #d2ab1c;
  }
  .inputSection .friend {
    width: 3.5rem;
    height: 2rem;
    border-radius: 1.5rem;
    // background-color: #e3b719;
    cursor: pointer;
  }
  .inputSection .friend .toggle {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 5px 0px 6px #0000001a;
    transform: translate(-100%, 0%);
    position: relative;
    transition: 0.3s cubic-bezier(0.86, 0.29, 0.24, 0.94);
  }
  input[type=file], input[type=text]{
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
  .inputSection button {
    height: 3rem;
    line-height: 3rem;
    padding: 0 1.5rem;
    text-align: center;
    display: inline-block;
    border-radius: 0.5rem;
    border: none;

    background: none;
  }
  .inputSection button.submit {
    width: 70%;
    max-width: 400px;

    cursor: pointer;

    color: #222;
    background-color: #fff;
    box-shadow: 0px 6px 10px 0px #00000030;
  }

  .inputSection button.submit:disabled,
  .inputSection button.submit[disabled] {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
  }

  .inputSection.err {
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    color: #222;
  }

  .inputSection .errMsg {
    background-color: #cccccc;
    border-radius 0.5rem;
    font-family: emoji;
  }
`;
