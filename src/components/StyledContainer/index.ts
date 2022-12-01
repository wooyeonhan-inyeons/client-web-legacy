import styled from "styled-components";
import { COLOR } from "../../constants";

export const StyledContainer = styled.div`
  padding: 4rem 1rem;
  // padding-top: 4rem;
  margin: 0 auto;
  position: relative;

  min-height: 100vh;
  max-width: 600px;
  overflow-x: hidden;

  background-color: ${COLOR.background};
  color: ${COLOR.content};
`;

export const StyledContainerFull = styled.div`
  margin: 0 auto;
  position: relative;

  min-height: 100vh;
  max-width: 600px;
  overflow-x: hidden;

  background-color: ${COLOR.background};
  color: ${COLOR.content};
`;

export const MapContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  height: 100vh;

  & > * {
    height: 100%;
    width: 100%;
  }

  a[href^="http://maps.google.com/maps"]
  {
    display: none !important;
  }
  a[href^="https://maps.google.com/maps"]
  {
    display: none !important;
  }

  .gmnoprint a,
  .gmnoprint span,
  .gm-style-cc {
    display: none;
  }
  .gmnoprint div {
    background: none !important;
  }
  .gm-style-iw-a {
    display: none;
  }
  .post-pin {
    width: 1rem;
  }
`;
