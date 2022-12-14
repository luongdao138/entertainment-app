import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import apiEndpoints from '../../constants/apiEndpoints';
import { client } from '../../services/client';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { IoMdCloseCircle } from 'react-icons/io';
import { toast } from 'react-toastify';
import successIcon from '../../assets/successful-icon.png';
import { resendVerifyEmail } from '../../services/auth';

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

  & .resent-email {
    width: 100%;
    background-color: rgb(114, 0, 161);
    padding: 2rem;
    border-radius: 4px;
    color: #fff;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;

    & img {
      width: 3rem;
      margin-right: 1rem;
    }
  }
`;

const VerifyAccount = () => {
  const [params] = useSearchParams();
  // const isFirstRenderRef = useRef<boolean>(true);
  const [status, setStatus] = useState<Status | null>(null);
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [isResentEmail, setIsResentEmail] = useState<boolean>(false);

  const token = params.get('token');
  const email = params.get('email') || '';

  useEffect(() => {
    // if (isFirstRenderRef.current) {
    //   isFirstRenderRef.current = false;
    //   return;
    // }

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
        return 'X??c th???c email th???t b???i, click button b??n d?????i ????? g???i l???i email x??c nh???n';
      case 2:
        return 'Email n??y ch??a ???????c ????ng k??';
      case 3:
        return 'Email n??y ???? ???????c x??c nh???n';

      default:
        return '';
    }
  };

  const handleResendEmail = async () => {
    try {
      setIsResentEmail(false);
      await resendVerifyEmail({ email });
      setIsResentEmail(true);
      toast.success('G???i email x??c th???c th??nh c??ng');
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.msg);
      } else {
        toast.error('C?? l???i x???y ra, vui l??ng th??? l???i');
      }
    }
  };

  return (
    <>
      {status && status !== 'pending' ? (
        <Container>
          {isResentEmail && (
            <div className='resent-email'>
              <img src={successIcon} alt='' />
              <span>
                Email ???? ???????c g???i, vui l??ng ki???m tra mail {email} ????? x??c th???c
                t??i kho???n
              </span>
            </div>
          )}
          {status === 'success' ? (
            <BsFillCheckCircleFill className='icon success-icon' />
          ) : (
            <IoMdCloseCircle className='icon  error-icon' />
          )}

          <h3>
            {status === 'error' ? 'X??c th???c th???t b???i' : 'X??c th???c th??nh c??ng'}
          </h3>
          {errorCode && <p>{getMessage(errorCode)}</p>}
          {status === 'error' && errorCode === 1 ? (
            <button onClick={handleResendEmail}>Resend email</button>
          ) : null}
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

export default VerifyAccount;
