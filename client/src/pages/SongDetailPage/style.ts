import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 4rem;
  padding-bottom: 4rem;
  & .detail-top {
    display: flex;

    & .song-list {
      flex-grow: 1;
    }

    & .recommend-songs {
      margin-top: 2.5rem;

      & .title {
        font-size: 2rem;
        line-height: 3rem;
        color: #fff;
        font-weight: 700;
        margin-bottom: 1.5rem;
        text-transform: capitalize;
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
