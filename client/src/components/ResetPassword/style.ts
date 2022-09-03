import styled from 'styled-components';

export const Container = styled.div`
  padding: 3.2rem 1.6rem;
  background-color: #432275;
  color: #fff;
  border-radius: 4px;

  & .title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  button {
    background-color: rgb(114, 0, 161);
    color: #fff;
    font-size: 12px;
    padding: 9px 24px;
    text-transform: uppercase;
    border-radius: 10rem;
    :hover {
      filter: brightness(0.9);
    }
  }

  .form-group {
    display: flex;
    flex-direction: column;
    width: 100%;

    & label {
      font-size: 1.4rem;
      color: #fff;
      font-weight: 500;
      margin-bottom: 1rem;
    }
    & + & {
      margin-top: 2rem;
    }

    .input-container {
      flex-grow: 1;
      max-width: 400px;
    }
    input {
      width: 100%;
      flex-grow: 1;
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

    & .error {
      display: block;
      margin-top: 0.75rem;
      font-size: 1.2rem;
      color: #ff0a0a;
    }
  }
  .form-group + .form-group {
    margin-top: 2rem;
  }

  .btn-container {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 3rem;
  }
`;
