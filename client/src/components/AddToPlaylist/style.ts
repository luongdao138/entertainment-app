import styled from 'styled-components';

export const Container = styled.div`
  background-color: #432275;
  width: 100%;

  .add-main {
    padding: 10px 20px 10px 14px;
    display: flex;
    color: rgb(218, 218, 218);
    font-size: 14px;
    cursor: pointer;
    align-items: center;

    &:hover {
      background-color: hsla(0, 0%, 100%, 0.1);
      color: #fff;
    }

    & svg {
      margin-right: 1.5rem;
      font-size: 2rem;
    }
  }
`;

export const PlaylistContainer = styled.div`
  width: 240px;
  background-color: #432275;
  padding: 10px 0;
  box-shadow: 0 0 5px 0 rgb(0 0 0 / 20%);
  border-radius: 8px;

  & .no-playlists {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 20rem;
    justify-content: center;
    margin-top: -3rem;

    & .icon {
      width: 3.5rem;
    }

    span {
      font-size: 1.4rem;
      color: hsla(0, 0%, 100%, 0.5);
      margin-top: -1rem;
    }
  }

  & .list-playlists {
    max-height: 20rem;
    overflow: auto;
  }

  & .add-playlist-item {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: transparent;
    color: #dadada;
    padding: 10px 20px 10px 14px;
    font-size: 14px;

    &:hover {
      background-color: hsla(0, 0%, 100%, 0.1);
      color: #fff;
    }

    & svg {
      font-size: 1.6rem;
      margin-right: 1rem;
    }

    &.new-playlist {
      margin-top: 1rem;

      svg {
        color: #b164b5;
        font-size: 2.6rem;
      }
    }
  }
  & .search-playlist-container {
    width: 100%;
    padding: 0 15px;

    input {
      height: 35px;
      font-size: 14px;
      border: none;
      background-color: hsla(0, 0%, 100%, 0.1);
      width: 100%;
      color: #eee;
      border-radius: 999px;
      padding: 0 15px;

      ::placeholder {
        color: hsla(0, 0%, 100%, 0.5);
      }
    }
  }
`;
