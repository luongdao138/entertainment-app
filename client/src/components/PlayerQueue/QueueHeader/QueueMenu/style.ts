import styled from 'styled-components';

export const Container = styled.div`
  padding: 10px 0;
  background-color: #432275;
  border-radius: 8px;
  width: 240px;
  box-shadow: 0 0 5px 0 rgb(0 0 0 / 20%);
  color: #dadada;

  & li {
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
