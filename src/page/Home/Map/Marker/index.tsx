import Avatar from "boring-avatars";
import styled from "styled-components";
import { AvatarColor } from "../../../../constants";

export const Marker = () => {
  return (
    <StyledMarker>
      {/* <div className="image"></div> */}
      <Avatar
        variant="beam"
        size={32}
        name={Date.now().toString()}
        colors={AvatarColor}
      />
    </StyledMarker>
  );
};

const StyledMarker = styled.div`
  width: 2.3rem;
  height: 2.3rem;
  background-color: #fff;
  border-radius: 50%;
  border: 0.15rem solid #fff;
`;
