import styled from 'styled-components';

interface Props {
  is_liked?: boolean;
  is_playing: boolean;
  is_changed: boolean;
  is_current_audio?: boolean;
  is_multiple?: boolean;
}

export const Container = styled.div`
  width: 300px;
  margin-right: 3rem;
  display: flex;
  align-items: center;
  flex-direction: column;

  & .playlist-thumbnail-container {
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border-radius: ${(props: Props) => (props.is_playing ? '999px' : '8px')};
    transition: ${(props: Props) =>
      props.is_playing
        ? 'border-radius 2s ease-out'
        : 'border-radius .5s ease-out .5s'};

    &:hover {
      .thumbnail-backdrop {
        visibility: ${(props: Props) =>
          props.is_playing ? 'hidden' : 'visible'};
        opacity: ${(props: Props) => (props.is_playing ? 0 : 1)};
      }

      img {
        transform: ${(props: Props) =>
          props.is_multiple ? 'scale(1)' : 'scale(1.1)'};
      }

      & .imgs {
        transform: scale(1.1);
      }
    }

    .thumbnail-icon {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        background-color: transparent;
        width: 45px;
        aspect-ratio: 1;
        border-radius: 100%;
        border: 1px solid #fff;
        display: grid;
        place-items: center;
        svg {
          font-size: 30px;
          color: #fff;
        }
      }
    }
  }
  & .playlist-thumbnail {
    box-shadow: 0 5px 8px 0 rgb(0 0 0 / 20%);
    overflow: hidden;
    border-radius: 8px;
    aspect-ratio: 1;
    overflow: hidden !important;
    position: relative;
    /* transition: ${(props: Props) =>
      props.is_playing
        ? 'border-radius 2s ease-out'
        : 'border-radius .5s ease-out .5s'};
    border-radius: ${(props: Props) => (props.is_playing ? '999px' : '8px')}; */
    animation: ${(props: Props) =>
      props.is_changed
        ? props.is_playing
          ? 'spin 12s linear infinite'
          : 'spin-off 0.5s'
        : 'none'};

    & .imgs {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      transition: all 0.35s ease-in-out;
    }
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(1turn);
      }
    }

    @keyframes spin-off {
      0% {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(1turn);
      }
    }

    img {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
      transition: all 0.35s ease-in-out;
    }

    .thumbnail-backdrop {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      opacity: 0;
      visibility: hidden;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 5;
    }
  }

  & .playlist-info-content {
    margin-top: 1.2rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    & > * {
      margin-top: 0.4rem;
    }
  }
  & .playlist-name {
    display: flex;
    align-items: center;
    color: #fff;
    span {
      font-weight: 2rem;
      line-height: 3rem;
      font-weight: 700;
    }

    button {
      color: #fff;
      background-color: transparent;
      margin-left: 0.8rem;
      svg {
        font-size: 2rem;
      }
    }
  }

  & .creator,
  .privacy,
  .like-count {
    color: hsla(0, 0%, 100%, 0.5);
    font-size: 12px;
    line-height: 1.75;
    span {
      color: #fff;
    }
  }

  & .play-btn {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    background-color: #7200a1;
    color: #fff;
    font-size: 14px;
    padding: 9px 24px;
    border-radius: 999px;
    text-transform: uppercase;

    svg {
      font-size: 2.5rem;
      margin-right: 0.5rem;
    }
  }
  & .playlist-actions {
    margin-top: 1.5rem;
    display: flex;
    align-items: center;

    & .action {
      width: 35px;
      aspect-ratio: 1;
      border-radius: 999px;
      background-color: hsla(0, 0%, 100%, 0.1);
      display: grid;
      place-items: center;
      color: #fff;
      svg {
        font-size: 1.6rem;
      }

      &:hover {
        filter: brightness(0.9);
      }

      &.favorite {
        color: ${(props: Props) => (props.is_liked ? '#7200a1' : '#fff')};
      }
    }

    & .action + .action {
      margin-left: 1rem;
    }
  }
`;
