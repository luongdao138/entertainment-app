import styled from 'styled-components';

interface Props {
  is_followed?: boolean;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  & .artist-thumbnail {
    border-radius: 100%;
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    position: relative;
    cursor: pointer;

    &:hover {
      img {
        transform: scale(1.05);
      }

      .opacity {
        opacity: 1;
        visibility: visible;
      }

      & .action {
        opacity: 1;
        visibility: visible;
      }
    }

    img {
      width: 100%;
      aspect-ratio: 1;
      border-radius: 100%;
      transition: all 0.35s ease-in-out;
    }

    .opacity {
      position: absolute;
      z-index: 5;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.1);
      opacity: 0;
      visibility: hidden;
      transition: all 0.1s ease-in-out;
    }

    & .action {
      width: 45px;
      aspect-ratio: 1;
      border-radius: 100%;
      display: grid;
      place-items: center;
      color: #fff;
      border: 1px solid #fff;
      position: absolute;
      z-index: 10;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: transparent;
      font-size: 2rem;
      opacity: 0;
      visibility: hidden;
    }
  }

  & .artist-name {
    margin-top: 15px;
    margin-bottom: 6px;
    font-size: 1.4rem;
    color: #fff;

    &:hover {
      color: #7200a1;
      text-decoration: underline;
    }
  }

  & .follow-count {
    color: rgba(255, 255, 255, 0.5);
    font-size: 1.2rem;
    line-height: 1.6rem;
    margin-bottom: 1.5rem;
  }

  & .artist-btn {
    background-color: ${(props: Props) =>
      props.is_followed ? '#170F23' : '#7200a1'};
    color: #fff;
    font-size: 12px;
    padding: 6px 19px;
    border-radius: 999px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    border: ${(props: Props) =>
      props.is_followed
        ? '1px solid hsla(0,0%,100%,0.1)'
        : '1px solid #7200a1'};
    svg {
      font-size: 1.6rem;
      margin-right: 0.5rem;
    }

    &:hover {
      filter: ${(props: Props) =>
        props.is_followed ? 'none' : 'brightness(0.9)'};
      color: ${(props: Props) => (props.is_followed ? '#7200a1' : '#fff')};
      border: 1px solid #7200a1;
    }
  }
`;
