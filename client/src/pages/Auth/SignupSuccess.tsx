import React from 'react';
import styled from 'styled-components';
import successIcon from '../../assets/successful-icon.png';
import { AuthType, useAuthContext } from '../../context/AuthContext';

const Container = styled.div`
  padding: 5rem 1.6rem;
  background-color: #170f23;
  color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;

  & img {
    width: 10rem;
  }

  .title {
    font-size: 3rem;
    font-weight: 600;
    text-align: center;
    margin: 2rem 0;
  }

  p {
    font-size: 1.4rem;
  }

  button {
    background-color: #7200a1;
    color: #fff;
    padding: 8px 24px;
    border-radius: 100rem;
    margin-top: 3rem;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

const SignupSuccess = () => {
  const { changeAuthType, registrationEmail } = useAuthContext();
  const handleBackToLogin = () => {
    changeAuthType(AuthType.LOGIN);
  };

  return (
    <Container>
      <img src={successIcon} alt='' />
      <h3 className='title'>
        Congratulations, you have successfully <span>Sign Up!</span>
      </h3>
      <p>Please check email {registrationEmail} to verify your account</p>
      <button onClick={handleBackToLogin}>Back to login</button>
    </Container>
  );
};

export default SignupSuccess;
