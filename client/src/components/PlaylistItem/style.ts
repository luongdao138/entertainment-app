import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  is_liked: boolean;
  is_multiple?: boolean;
  is_playing?: boolean;
}

export const SidebarItemContainer = styled(Link)`
  display: flex;
  align-items: center;
  height: 32px;
  font-size: 1.3rem;
  padding: 0 2.5rem;

  span {
    color: #fff;
    font-size: 1.3rem;
    flex-grow: 1;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .more-btn {
    margin-left: 1.5rem;
    width: 2.5rem;
    aspect-ratio: 1;
    border-radius: 100%;
    display: grid;
    place-items: center;
    color: #fff;
    font-size: 1.6rem;
    background-color: transparent;
    opacity: 0;
    visibility: hidden;

    &:hover {
      background-color: hsla(0, 0%, 100%, 0.3);
    }
  }

  &:hover {
    .more-btn {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const Container = styled.div`
  & .thumbnail-container {
    border-radius: 0.8rem;
    overflow: hidden;
    display: block;
    position: relative;
    margin-bottom: 0.8rem;
    aspect-ratio: 1;

    & img {
      transition: transform 0.35s ease-in-out;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    & .imgs {
      transition: transform 0.35s ease-in-out;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      height: 100%;
      width: 100%;
    }

    &:hover img {
      transform: ${(props: Props) =>
        props.is_multiple ? 'scale(1)' : 'scale(1.1)'};
    }

    &:hover .imgs {
      transform: ${(props: Props) =>
        props.is_multiple ? 'scale(1.1)' : 'scale(1)'};
    }

    & .thumbnail-backdrop {
      z-index: 10;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transition: all 0.1s;
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      opacity: 0;
      visibility: hidden;
    }

    &:hover .thumbnail-backdrop {
      opacity: 1;
      visibility: visible;
    }

    & .thumbnail-actions {
      position: absolute;
      z-index: 11;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      width: 100%;
      transition: all 0.1s;
      /* opacity: 0;
      visibility: hidden; */

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
          color: ${(props: Props) => (props.is_liked ? '#7200a1' : '#fff')};
          font-size: 2rem;
        }
        &:hover {
          background-color: #ffffff1a;
        }
      }

      & .action {
        width: 3rem;
        aspect-ratio: 1;
        border-radius: 100%;
        display: grid;
        place-items: center;
        color: #fff;
        font-size: 2.5rem;
        background-color: transparent;
        opacity: 0;
        visibility: hidden;

        &:hover {
          background-color: hsla(0, 0%, 100%, 0.3);
        }
      }

      & .play-state {
        width: 4.5rem;
        aspect-ratio: 1;
        border-radius: 100%;
        display: grid;
        place-items: center;
        color: #fff;
        font-size: 2.5rem;
        background-color: transparent;
        border: 1px solid #fff;
        opacity: ${(props: Props) => (props.is_playing ? 1 : 0)};
        visibility: ${(props: Props) =>
          props.is_playing ? 'visible' : 'hidden'};

        &:hover {
          filter: brightness(0.9);
        }
      }
    }

    &:hover .action,
    &:hover .favorite,
    &:hover .play-state {
      opacity: 1;
      visibility: visible;
    }
  }

  & .name {
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 1.9rem;
    color: #fff;
    display: inline-block;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;

    &:hover {
      color: #c662ef;
    }
    margin-bottom: 0.3rem;
  }

  & .author {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.5);
  }
`;
