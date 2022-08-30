import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  & label {
    color: #dadada;
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 0.75rem;
  }

  & .error {
    display: block;
    margin: 0.75rem;
    font-size: 1.2rem;
    color: #ff0a0a;
  }

  input {
    width: 100%;
    height: 4rem;
    border-radius: 2rem;
    background-color: hsla(0, 0%, 100%, 0.1);
    border: none;
    color: #eee;
    padding: 5px 0;
    font-size: 1.4rem;
    padding: 0 2rem;

    ::placeholder {
      color: hsla(0, 0%, 100%, 0.5);
    }

    :focus {
      background-color: #432275;
    }
  }

  .input-container {
    position: relative;
  }

  .icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 2rem;
    font-size: 2rem;
    cursor: pointer;
    color: #fff;
  }
`;
