import styled from 'styled-components';

export const Container = styled.div`
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
`;
