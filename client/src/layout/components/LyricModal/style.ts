import styled from "styled-components";

interface Props {
  open_lyric: boolean;
}

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1003;
  background-color: red;
  visibility: ${(props: Props) => (props.open_lyric ? "visible" : "hidden")};

  & .background-container {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;

    & .blur-image {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      filter: blur(50px);
      -webkit-filter: blur(50px);
    }

    & .overlay {
      background-color: rgba(41, 21, 71, 0.8);
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
`;
