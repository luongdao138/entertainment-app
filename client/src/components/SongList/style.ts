import styled from 'styled-components';

export const Container = styled.div`
  & .list-header {
    & span {
      color: rgba(255, 255, 255, 0.5);
      text-transform: uppercase;
      font-size: 1.2rem;
      line-height: 1.5rem;
      font-weight: 500;
    }

    border-bottom: 1px solid hsla(0, 0%, 100%, 0.05);
    min-height: 4.6rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & .list-header-left {
      display: flex;
      align-items: center;

      & .sort-icon {
        background-color: transparent;
        margin-right: 1rem;
        svg {
          color: rgba(255, 255, 255, 0.5);
          font-size: 1.6rem;
          cursor: pointer;
          &:hover {
            filter: brightness(0.9);
          }
        }
      }

      .more-icon,
      .add-playlist {
        border: 1px solid hsla(0, 0%, 100%, 0.2);
        background-color: hsla(0, 0%, 100%, 0.05);
        color: hsla(0, 0%, 100%, 0.5);

        :hover {
          filter: brightness(0.9);
        }
      }

      .more-icon {
        width: 22px;
        aspect-ratio: 1;
        display: grid;
        place-items: center;
        border-radius: 50%;
      }

      & .add-playlist {
        padding: 2px 10px;
        border: 50%;
        border-radius: 999px;
        margin: 0 10px;
        font-size: 10px;
        display: flex;
        align-items: center;

        svg {
          margin-right: 0.5rem;
          font-size: 1.6rem;
        }

        span {
          font-weight: 500;
          line-height: 1.6;
          text-transform: uppercase;
          letter-spacing: normal;
          font-size: 10px;
        }
      }
    }
  }
`;
