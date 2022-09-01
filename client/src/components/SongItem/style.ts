import styled from 'styled-components';

interface Props {
  openMenu?: boolean;
  is_liked?: boolean;
  is_current_audio?: boolean;
  is_active?: boolean;
  is_show_checkbox?: boolean;
  is_selected?: boolean;
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
      opacity: ${(props: Props) =>
        props.is_show_checkbox ? 0 : props.is_active ? 0 : 1};
      visibility: ${(props: Props) =>
        props.is_show_checkbox
          ? 'hidden'
          : props.is_active
          ? 'hidden'
          : 'visible'};
    }

    & .song-checkbox {
      position: absolute;
      top: 50%;
      z-index: 10;
      transform: translateY(-50%);
      opacity: ${(props: Props) =>
        !props.is_show_checkbox ? (props.is_active ? 1 : 0) : 1};
      visibility: ${(props: Props) =>
        !props.is_show_checkbox
          ? props.is_active
            ? 'visible'
            : 'hidden'
          : 'visible'};
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
    }

    & .more-action {
      display: none;
      place-items: center;
      width: 3.8rem;
      height: 3.8rem;
      border-radius: 50%;
      background-color: transparent;

      svg {
        color: #fff;
        font-size: 2rem;
      }
    }
  }

  &:hover {
    background-color: ${(props: Props) =>
      props.is_active ? '#3A3344' : '#2f283a'};

    & .music-icon {
      opacity: 0;
      visibility: hidden;
    }
    & .song-checkbox {
      opacity: 1;
      visibility: visible;
    }

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
        display: none;
      }

      & .more-action {
        display: grid;

        &:hover {
          background-color: #ffffff1a;
        }
      }
    }
  }

  & .song-menu {
    background-color: #432275;
    width: 280px;

    & .menu-info {
      img {
        width: 4rem;
        height: 4rem;
        object-fit: cover;
        border-radius: 4px;
        margin-right: 1rem;
      }

      display: flex;
      align-items: center;
      padding: 15px;

      & .menu-name h4 {
        font-size: 1.4rem;
        line-height: 1.8rem;
        font-weight: 500;
        color: #fff;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      & .menu-name p {
        color: hsla(0, 0%, 100%, 0.5);
        font-size: 1.2rem;
      }
    }

    & .menu-btns {
      margin: 0 15px 15px;
      border-radius: 0.8rem;
      background-color: #563983;
      display: flex;

      & button {
        flex: 1 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0.8rem 0;
        border-radius: 8px;
        transition: all 0.1s;
        font-size: 1rem;
        color: #fff;
        background-color: transparent;

        &:hover {
          background-color: hsla(0, 0%, 100%, 0.1);
          color: #fff;
        }

        & + & {
          margin-left: 0.5rem;
        }

        & svg {
          margin-bottom: 0.5rem;
          font-size: 1.5rem;
        }
      }
    }

    & .menu-list {
      & li {
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
    }
  }

  background-color: ${(props: Props) =>
    props.is_active
      ? '#3A3344'
      : props.is_current_audio
      ? '#2f283a'
      : 'transparent'};
`;

export const ProgressItem = styled.div`
  margin-top: 2rem;
`;
