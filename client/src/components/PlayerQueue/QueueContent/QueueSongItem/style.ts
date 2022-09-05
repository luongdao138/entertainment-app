import styled from 'styled-components';

interface Props {
  is_liked?: boolean;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  padding: 8px;
  user-select: none;

  .song-left {
    display: flex;
    align-items: center;
    flex-grow: 1;
    & .song-thumbnail {
      width: 4rem;
      height: 4rem;
      flex-shrink: 0;
      margin-right: 1rem;
      border-radius: 4px;
      overflow: hidden;
      position: relative;
      cursor: pointer;

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
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      & .singer {
        color: rgba(255, 255, 255, 0.5);
        font-size: 1.2rem;
        line-height: 1.6rem;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }

  .song-right {
    display: none;
    align-items: center;
    margin-left: 1rem;
    .action {
      display: grid;
      place-items: center;
      width: 2.8rem;
      height: 2.8rem;
      border-radius: 50%;
      margin-right: 0.75rem;
      background-color: transparent;

      & svg {
        font-size: 1.8rem;
      }

      &:hover {
        background-color: #ffffff1a;
      }
    }

    & .favourite svg {
      color: ${(props: Props) => (props.is_liked ? '#7200a1' : '#fff')};
    }

    & .more-btn svg {
      color: #fff;
    }
  }

  &:hover {
    background-color: #2f283a;
    & .song-thumbnail {
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
      display: flex;
    }
  }
`;
