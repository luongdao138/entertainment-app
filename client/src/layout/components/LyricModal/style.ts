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
  transform: ${(props: Props) =>
    props.open_lyric ? "translateY(0)" : "translateY(100%)"};
  animation: ${(props: Props) =>
    props.open_lyric ? "slide-up .8s forwards" : "slide-down .8s forwards"};

  @keyframes slide-up {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slide-down {
    from {
      transform: ${(props: Props) =>
        props.open_lyric ? "translateY(0)" : "translateY(100%)"};
    }
    to {
      transform: translateY(100%);
    }
  }

  & .background-container {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #432275;
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

  & .lyric-content {
    position: absolute;
    bottom: 90px;
    z-index: 1;
    top: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    /* background-color: red; */
  }
`;
