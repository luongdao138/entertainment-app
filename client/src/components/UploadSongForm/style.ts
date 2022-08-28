import styled from 'styled-components';

export const Container = styled.div`
  padding: 3.2rem 1.6rem;
  background-color: #170f23;
  color: #fff;

  .btns-container {
    display: flex;
    justify-content: center;

    button {
      background-color: rgb(114, 0, 161);
      color: #fff;
      font-size: 12px;
      padding: 9px 24px;
      text-transform: uppercase;
      border-radius: 10rem;
    }

    button + button {
      margin-left: 1rem;
    }
  }

  & .progress-item:first-child {
    margin-top: 2rem;
  }

  & .progress-item:nth-of-type(2) {
    margin-top: 1rem;
  }

  & .save-container {
    margin-top: 3rem;
    display: flex;
    justify-content: center;

    button {
      background-color: rgb(114, 0, 161);
      color: #fff;
      font-size: 12px;
      padding: 9px 24px;
      text-transform: uppercase;
      border-radius: 10rem;

      &:hover {
        filter: brightness(0.9);
      }

      &:disabled {
        opacity: 0.6;
      }
    }
  }
  .uploaded-song {
    width: 100%;
    border-radius: 4px;
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
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
        opacity: 0;
        visibility: hidden;

        & svg {
          color: #fff;
          font-size: 2rem;
        }
        &:hover {
          background-color: #ffffff1a;
        }
      }

      & .duration {
        font-size: 1.2rem;
        color: hsla(0, 0%, 100%, 0.5);
      }
    }

    &:hover {
      background-color: #2f283a;
    }
  }
`;
