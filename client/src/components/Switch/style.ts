import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  & .left {
    flex-grow: 1;
    & .title {
      font-size: 1.4rem;
      line-height: 2.1rem;
      margin-bottom: 0.5rem;
    }

    & .desc {
      font-size: 1.2rem;
      line-height: 1.8rem;
      color: rgba(255, 255, 255, 0.5);
    }
  }

  & .right {
    margin-left: 2rem;
  }
`;
