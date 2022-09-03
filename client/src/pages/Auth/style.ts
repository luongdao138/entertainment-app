import styled from 'styled-components';

export const Container = styled.div`
  padding: 3.2rem 1.6rem;
  background-color: #432275;
  color: #fff;
  border-radius: 4px;

  & .title {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 3rem;
  }

  .logo {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    img {
      width: 150px;
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
  & .forgot-pw {
    background-color: transparent;
    color: #fff;
    /* text-decoration: underline; */
    font-size: 1.4rem;
    &:hover {
      text-decoration: underline;
      color: #7200a1;
    }
  }
`;
