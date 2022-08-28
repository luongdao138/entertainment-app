import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  color: #fff;

  & .progress {
    flex-grow: 1;
    margin-right: 1rem;
  }

  & .percent {
    font-size: 1.2rem;
    font-weight: 500;
  }
`;
