import styled from 'styled-components';

interface Props {
  is_liked?: boolean;
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 4px;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.05);
  position: relative;
  user-select: none;

  & .song-left {
    display: flex;
    align-items: center;

    & .music-icon {
      margin-right: 1rem;
      font-size: 1.5rem;
      color: hsla(0, 0%, 100%, 0.5);
    }
  }

  & .song-thumbnail {
    width: 4rem;
    height: 4rem;
    flex-shrink: 0;
    margin-right: 1rem;
    border-radius: 4px;
    overflow: hidden;
    position: relative;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    & .play-state {
      opacity: 0;
      visibility: hidden;
      position: absolute;
      z-index: 20;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2.5rem;
      color: #fff;
    }
  }

  & .song-info {
    & .name {
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 1.8rem;
      color: #fff;
      margin-bottom: 0.3rem;
    }

    & .singer {
      color: rgba(255, 255, 255, 0.5);
      font-size: 1.2rem;
      line-height: 1.6rem;
    }
  }

  & .song-right {
    display: flex;
    align-items: center;

    & .favorite {
      display: grid;
      place-items: center;
      width: 3.8rem;
      height: 3.8rem;
      border-radius: 50%;
      margin-right: 0.75rem;
      background-color: transparent;
      opacity: ${(props: Props) => (props.is_liked ? 1 : 0)};
      visibility: ${(props: Props) => (props.is_liked ? 'visible' : 'hidden')};

      & svg {
        color: ${(props: Props) => (props.is_liked ? '#7200a1' : '#fff')};
        font-size: 2rem;
      }
      &:hover {
        background-color: #ffffff1a;
      }
    }

    & .duration {
      font-size: 1.2rem;
      color: hsla(0, 0%, 100%, 0.5);
      display: flex;
      min-width: 5rem;
      justify-content: flex-end;
    }

    & .more-action {
      opacity: 0;
      visibility: hidden;
      place-items: center;
      width: 3.8rem;
      height: 3.8rem;
      border-radius: 50%;
      background-color: transparent;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 1rem;

      svg {
        color: #fff;
        font-size: 2rem;
      }
    }
  }

  &:hover {
    background-color: #2f283a;

    & .song-thumbnail {
      cursor: pointer;

      & .opacity {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 10;
        background-color: rgba(0, 0, 0, 0.5);
      }

      & .play-state {
        opacity: 1;
        visibility: visible;
      }
    }

    & .song-right {
      & .favorite {
        opacity: 1;
        visibility: visible;
      }

      & .duration {
        opacity: 0;
        visibility: hidden;
      }

      & .more-action {
        display: grid;
        opacity: 1;
        visibility: visible;

        &:hover {
          background-color: #ffffff1a;
        }
      }
    }
  }
`;

export const ProgressItem = styled.div`
  margin-top: 2rem;
`;
