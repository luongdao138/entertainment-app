import styled from "styled-components";

interface StyleProps {
  openQueue?: boolean;
  open_lyric?: boolean;
}

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1005;
  cursor: pointer;
  background-color: ${(props: StyleProps) =>
    props.open_lyric ? "transparent" : "#170f23"};

  & .player-content {
    padding: 0 2rem;
    height: 9rem;
    border-top: ${(props: StyleProps) =>
      props.open_lyric
        ? "1px solid transparent"
        : "1px solid hsla(0, 0%, 100%, 0.1)"};
    display: flex;
    align-items: center;
    justify-content: space-between;

    .player-left {
      width: 30%;
      opacity: ${(props: StyleProps) => (props.open_lyric ? 0 : 1)};
      visibility: ${(props: StyleProps) =>
        props.open_lyric ? "hidden" : "visible"};
    }
    .player-middle {
      max-width: 40vw;
      flex-grow: 1;
      display: flex;
      flex-direction: ${(props: StyleProps) =>
        props.open_lyric ? "column-reverse" : "column"};
      justify-content: center;
    }
    .player-right {
      width: 30%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      opacity: ${(props: StyleProps) => (props.open_lyric ? 0 : 1)};
      visibility: ${(props: StyleProps) =>
        props.open_lyric ? "hidden" : "visible"};
      & .divider {
        margin: 0 2rem;
        height: 33px;
        width: 1px;
        background-color: hsla(0, 0%, 100%, 0.1);

        @media (min-width: 1590px) {
          display: none;
        }
      }
      & .queue {
        button {
          background-color: ${(props: StyleProps) =>
            props.openQueue ? "#7200a1" : "hsla(0, 0%, 100%, 0.1)"};
          border-radius: 4px;
          padding: 0 5px;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 3rem;
          svg {
            font-size: 2rem;
          }
        }

        @media (min-width: 1590px) {
          display: none;
        }
      }
    }
  }
`;
