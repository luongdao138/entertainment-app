import styled from 'styled-components';

interface Props {
  openMenu?: boolean;
  is_liked?: boolean;
  is_current_audio?: boolean;
  is_active?: boolean;
  is_show_checkbox?: boolean;
  is_selected?: boolean;
  is_dragging?: boolean;
  enable_select_multiple?: boolean;
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 4px;
  position: relative;
  user-select: none;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.05);

  & .song-left {
    display: flex;
    align-items: center;
    width: 50%;

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
      opacity: ${(props: Props) => (props.is_current_audio ? 1 : 0)};
      visibility: ${(props: Props) =>
        props.is_current_audio ? 'visible' : 'hidden'};
      position: absolute;
      z-index: 20;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2.5rem;
      color: #fff;
    }

    & .opacity {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 10;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: ${(props: Props) => (props.is_current_audio ? 1 : 0)};
      visibility: ${(props: Props) =>
        props.is_current_audio ? 'visible' : 'hidden'};
    }
  }

  & .song-info {
    & .name {
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 1.8rem;
      color: #fff;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-bottom: 0.3rem;
    }

    & .singer {
      color: rgba(255, 255, 255, 0.5);
      font-size: 1.2rem;
      line-height: 1.6rem;
    }
  }

  & .song-privacy {
    button {
      background-color: transparent;
      display: flex;
      align-items: center;
      color: rgba(255, 255, 255, 0.5);

      span {
        font-size: 1.2rem;
        font-weight: 500;
        color: ${(props: Props) =>
          props.is_active ? '#fff' : 'rrgba(255, 255, 255, 0.5)'};
      }

      svg {
        font-size: 2.4rem;
      }
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
      opacity: 1;
      visibility: visible;
      display: flex;
      justify-content: flex-end;
      min-width: 40px;
    }

    & .more-action {
      opacity: 0;
      visibility: hidden;
      /* display: none; */
      place-items: center;
      width: 3.8rem;
      height: 3.8rem;
      border-radius: 50%;
      display: grid;
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
    background-color: ${(props: Props) =>
      props.is_active ? '#3A3344' : '#2f283a'};

    & .music-icon {
      opacity: ${(props: Props) => (props.enable_select_multiple ? 0 : 1)};
      visibility: ${(props: Props) =>
        props.enable_select_multiple ? 'hidden' : 'visible'};
    }
    & .song-checkbox {
      opacity: 1;
      visibility: visible;
    }

    & .song-thumbnail {
      cursor: pointer;

      & .opacity {
        opacity: 1;
        visibility: visible;
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
        /* display: none; */
      }

      & .more-action {
        opacity: 1;
        visibility: visible;

        &:hover {
          background-color: #ffffff1a;
        }
      }
    }
  }

  background-color: ${(props: Props) =>
    props.is_dragging
      ? '#432275'
      : props.is_active
      ? '#3A3344'
      : props.is_current_audio
      ? '#2f283a'
      : 'transparent'};
`;

export const ProgressItem = styled.div`
  margin-top: 2rem;
`;

export const PrivacyMenu = styled.div`
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  background-color: #432275;
  border-radius: 4px;

  & li {
    width: 100px;
    padding: 5px 10px;
    font-size: 1.2rem;
    line-height: 1.8rem;
    color: rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      span {
        color: #c662ef;
      }
    }

    svg {
      font-size: 2rem;
      margin-left: 0.25rem;
    }
  }

  li + li {
    border-top: 1px solid hsla(0, 0%, 100%, 0.05);
  }
`;
