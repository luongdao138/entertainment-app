import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px 25px 15px;
  background-color: #432275;
  border-radius: 8px;
  color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;

  & .title {
    font-size: 1.8rem;
    line-height: 2.7rem;
    font-weight: 700;
    text-transform: capitalize;
    margin-bottom: 2.5rem;
  }

  & .desc {
    margin: 2rem 0;
    color: hsla(0, 0%, 100%, 0.5);
    font-size: 1.2rem;
    line-height: 1.8rem;

    span {
      font-weight: 700;
    }
  }

  & .btn {
    width: 100%;
    border-radius: 999px;
    text-transform: uppercase;
    padding: 8px 0;
    color: #fff;
    font-size: 1.4rem;
    background-color: transparent;
    &:hover {
      filter: brightness(0.9);
    }
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  & .save-btn {
    background-color: #7200a1;
    padding: 9px 2.4rem;
  }

  & .cancel-btn {
    margin-top: 0.8rem;
  }

  .alarm-content {
    width: 100%;
    padding: 15px 19px 20px 20px;
    border-radius: 8px;
    background-color: hsla(0, 0%, 100%, 0.1);
    display: flex;
    align-items: center;
    & .dot {
      font-size: 3.4rem;
      margin: 0 0.8rem;
    }
  }
`;
