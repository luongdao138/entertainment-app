import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import apiEndpoints from '../../constants/apiEndpoints';
import { client } from '../../services/client';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { IoMdCloseCircle } from 'react-icons/io';

type Status = 'pending' | 'success' | 'error';

const Container = styled.div`
  padding-top: 7rem;
  display: flex;
  align-items: center;
  flex-direction: column;

  & .icon {
    font-size: 6rem;
    color: #fff;
  }

  & .error-icon {
    color: red;
  }

  & .success-icon {
    color: green;
  }

  h3 {
    font-size: 4rem;
    font-weight: 600;
    color: #fff;
    margin: 2rem 0;
  }

  p {
    color: #fff;
    font-size: 1.4rem;
  }

  button {
    margin-top: 3rem;
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
`;

const VerifyAccount = () => {
  const [params] = useSearchParams();
  const isFirstRenderRef = useRef<boolean>(true);
  const [status, setStatus] = useState<Status | null>(null);
  const [errorCode, setErrorCode] = useState<number | null>(null);

  const token = params.get('token');

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    const controller = new AbortController();

    setStatus('pending');
    // verify token
    client
      .post(apiEndpoints.VERIFY_EMAIL, { token }, { signal: controller.signal })
      .then(() => {
        setStatus('success');
      })
      .catch((error: any) => {
        setStatus('error');
        if (error.response) {
          setErrorCode(error.response.data.code);
        } else {
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  const getMessage = (code: number) => {
    switch (code) {
      case 1:
        return 'Xác thực email thất bại, click button bên dưới để gửi lại email xác nhận';
      case 2:
        return 'Email này chưa được đăng ký';
      case 3:
        return 'Email này đã được xác nhận';

      default:
        return '';
    }
  };

  return (
    <>
      {status && status !== 'pending' ? (
        <Container>
          {status === 'success' ? (
            <BsFillCheckCircleFill className='icon success-icon' />
          ) : (
            <IoMdCloseCircle className='icon  error-icon' />
          )}

          <h3>
            {status === 'error' ? 'Xác thực thất bại' : 'Xác thực thành công'}
          </h3>
          {errorCode && <p>{getMessage(errorCode)}</p>}
          {status === 'error' && errorCode === 1 ? (
            <button>Resend email</button>
          ) : null}
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

export default VerifyAccount;
