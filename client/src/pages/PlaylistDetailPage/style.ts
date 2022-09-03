import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 4rem;
  padding-bottom: 4rem;
  & .detail-top {
    display: flex;
  }

  & .playlist-songs {
    flex-grow: 1;

    & .no-songs {
      margin-bottom: 2rem;
      min-height: 220px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      background-color: hsla(0, 0%, 100%, 0.1);
      padding: 30px 0;
      color: rgba(255, 255, 255, 0.5);

      p {
        font-size: 1.6rem;
      }

      svg {
        font-size: 8rem;
        margin-bottom: 2rem;
      }
    }

    & .playlist-songs-main {
      margin-bottom: 2rem;

      & .song-count {
        margin-top: 1.5rem;
        font-size: 1.2rem;
        line-height: 1.8rem;
        color: rgba(255, 255, 255, 0.5);
        display: flex;

        & .count {
          position: relative;
          margin-right: 2.5rem;
          &::after {
            content: '';
            width: 4px;
            aspect-ratio: 1;
            border-radius: 100%;
            background-color: rgba(255, 255, 255, 0.5);
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: -1.25rem;
          }
        }
      }
    }
  }

  .group {
    margin-top: 4rem;

    .title {
      margin-bottom: 1.6rem;
      font-size: 2rem;
      line-height: 3rem;
      color: #fff;
      text-transform: capitalize;
    }

    .group-list {
      display: grid;
      gap: 2.8rem;
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;
