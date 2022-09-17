import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 2rem;
  padding-bottom: 3rem;

  & .header {
    min-height: 5.2rem;
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
    margin-bottom: 2rem;
    display: flex;
    align-items: center;

    & .title {
      font-size: 2.4rem;
      color: #fff;
      padding-right: 2rem;
      border-right: 1px solid hsla(0, 0%, 100%, 0.1);
    }
  }

  & .playlist-list {
    display: grid;
    gap: 3rem;
    grid-template-columns: repeat(4, 1fr);

    & .empty-playlist {
      color: #fff;
      border: 1px solid hsla(0, 0%, 100%, 0.1);
      border-radius: 4px;
      transition: all 0.1s ease-in-out;
      cursor: pointer;
      min-height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      svg {
        font-size: 5rem;
        margin-bottom: 1rem;
      }

      span {
        font-size: 1.5rem;
        line-height: 2.3rem;
      }

      &:hover {
        color: #c662ef;
      }
    }

    @media screen and (min-width: 1350px) and (max-width: 1637px) {
      grid-template-columns: repeat(5, 1fr);
    }

    @media screen and (min-width: 1224px) and (max-width: 1350px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media screen and (max-width: 1024px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;
