import styled from 'styled-components';

export const Container = styled.div`
  padding: 1rem 0;
  background-color: #432275;
  border-radius: 0.8rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  width: 25rem;
  color: #dadada;

  & .list li {
    padding: 10px 20px 10px 14px;
    font-size: 14px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.2 ease-in-out;

    & svg {
      font-size: 1.6rem;
      margin-right: 1.4rem;
    }

    &:hover {
      background-color: hsla(0, 0%, 100%, 0.1);
      color: #fff;
    }
  }
`;
