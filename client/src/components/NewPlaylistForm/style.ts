import styled from 'styled-components';

export const Container = styled.div`
  background-color: #432275;
  border-radius: 8px;
  color: #fff;
  padding: 2rem 3rem;
  position: relative;

  & > .title {
    font-size: 1.8rem;
    line-height: 2.7rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 1rem;
  }

  input {
    height: 40px;
    width: 100%;
    border-radius: 999px;
    border: 1px solid hsla(0, 0%, 100%, 0.1);
    background-color: hsla(0, 0%, 100%, 0.1);
    padding: 0 15px;
    font-size: 14px;
    color: #fff;
    margin-bottom: 2rem;
  }

  & .switch {
    margin-bottom: 2rem;
  }

  & .create-btn {
    background-color: #7200a1;
    border-color: #7200a1;
    color: #fff;
    width: 100%;
    font-size: 14px;
    border-radius: 999px;
    padding: 8px 0;
    text-transform: uppercase;

    &:hover {
      filter: brightness(0.9);
    }

    &:disabled {
      box-shadow: none;
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  & .close-btn {
    background-color: transparent;
    font-size: 2.5rem;
    color: #fff;
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
  }
`;
