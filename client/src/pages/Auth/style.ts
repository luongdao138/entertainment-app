import styled from 'styled-components';

export const Container = styled.div`
  padding: 3.2rem 1.6rem;
  background-color: #170f23;
  color: #fff;

  & .title {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 3rem;
  }

  .form-group + .form-group {
    margin-top: 2rem;
  }

  & .form-group {
    display: flex;
    flex-direction: column;

    & label {
      color: #dadada;
      font-size: 1.4rem;
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
  }

  & .nav {
    text-align: right;
    margin-top: 2rem;
    font-size: 1.4rem;

    button {
      background-color: transparent;
      color: #7200a1;
      text-decoration: underline;
    }
  }

  & .submit-btn {
    width: 100%;
    background-color: #7200a1;
    color: #fff;
    padding: 12px 24px;
    border-radius: 100rem;
    margin-top: 2rem;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
