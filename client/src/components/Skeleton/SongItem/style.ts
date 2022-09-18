import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  .left-wrapper {
    flex-grow: 1;
    margin-right: 2rem;
  }
  .left {
    max-width: 300px;
    display: flex;
    align-items: center;
    .thumbnail {
      width: 32px;
      aspect-ratio: 1;
      margin-right: 0.8rem;
    }

    .info {
      flex: 1;
      .singer-name {
        margin-top: 0.8rem;
        width: 60%;
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
    & > * {
      display: block;
      width: 19px;
      aspect-ratio: 1;
      overflow: hidden;
      border-radius: 100%;
      & span {
        width: 100%;
        height: 100%;
      }
    }

    & > *:not(:first-child) {
      margin-left: 1.2rem;
    }
  }
`;
