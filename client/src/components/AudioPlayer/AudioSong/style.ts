import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  .song-thumbnail {
    width: 64px;
    border-radius: 4px;
    overflow: hidden;
    aspect-ratio: 1;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    margin-right: 1rem;
    flex-grow: 0;
    flex-shrink: 0;
  }

  .song-info {
    flex-grow: 1;
    flex-shrink: 1;
    max-width: max-content;
    display: flex;
    flex-direction: column;

    .song-name {
      font-size: 1.4rem;
      line-height: 1.9rem;
      color: #fff;
      font-weight: 500;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-bottom: 0.25rem;
    }

    .singer-name {
      font-size: 1.2rem;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      color: hsla(0, 0%, 100%, 0.5);
      &:hover {
        color: #c662ef;
      }
    }
  }

  .song-actions {
    flex-grow: 0;
    flex-shrink: 0;
    margin-left: 2rem;
    display: flex;
    align-items: center;

    button {
      display: grid;
      place-items: center;
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
      margin-right: 0.75rem;
      background-color: transparent;

      & svg {
        color: #fff;
        font-size: 1.8rem;
      }
      &:hover {
        background-color: #ffffff1a;
      }

      &.more-action {
        margin-right: 0.25rem;
      }
    }
  }
`;
