import styled from "styled-components";
import { OutputSentence } from "./index";

export const Container = styled.div`
  margin-bottom: 2rem;
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
  margin: 0 -15px;
  height: 100%;

  .lyric-left {
    width: 41.667%;
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;

    & .thumbnail {
      width: 500px;
      max-width: 80%;
      margin-right: 5rem;
      border-radius: 4px;
      overflow: hidden;
      position: relative;

      & .audio-playing-icon {
        position: absolute;
        z-index: 1;
        bottom: 16px;
        left: 12px;
      }

      img {
        width: 100%;
        aspect-ratio: 1;
        object-fit: cover;
      }
    }
  }

  .lyric-right {
    padding: 0 15px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .lyric-right-content {
      max-height: 500px;
      overflow-y: auto;
      mask-image: linear-gradient(
        180deg,
        hsla(0, 0%, 100%, 0),
        hsla(0, 0%, 100%, 0.8) 10%,
        #fff 25%,
        #fff 75%,
        hsla(0, 0%, 100%, 0.8) 90%,
        hsla(0, 0%, 100%, 0)
      );
    }
  }
`;

interface LyricProps {
  status: OutputSentence["status"];
}

export const LyricItem = styled.li`
  padding: 20px 0;
  font-weight: 700;
  font-size: 42px;
  color: ${(props: LyricProps) =>
    props.status === "archived"
      ? "hsla(0,0%,100%,.5)"
      : props.status === "current"
      ? "#ffed00"
      : "#fff"};
`;
