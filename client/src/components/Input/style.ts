import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;

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
    background-color: transparent;
    /* background-color: hsla(0, 0%, 100%, 0.1); */
    border: none;
    color: #eee;
    padding: 10px 15px;
    font-size: 12px;
    border-radius: 4px;
    border: 1px solid hsla(0, 0%, 100%, 0.1);

    ::placeholder {
      color: hsla(0, 0%, 100%, 0.5);
    }

    :focus {
      border-color: #7200a1;
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
