import { useRecoilState } from "recoil";
import styled from "styled-components";
import { MYPAGE_ } from "../../../../constants";
import { recoil_ } from "../../../../recoil";

const CarouselBox = styled.div`
  width: 200%;
  height: 20rem;
  background-color: #d2d2d2;

  position: absolute;

  transition: all ease-in-out 0.5s;
`;

const ActiveStyle = (state: MYPAGE_) => {
  // if(state === MYPAGE_.MY_POST)
  let value;
  switch (state) {
    case MYPAGE_.RECENT_POST:
      value = "-100%";
      break;
    case MYPAGE_.MY_POST:
      value = "0%";
  }
  return { left: value };
};

export const Carousel = () => {
  const [tab] = useRecoilState(recoil_.tabState);
  return (
    <>
      <CarouselBox style={ActiveStyle(tab)}>
        <div className="asd">asdasdasda</div>
      </CarouselBox>
    </>
  );
};
