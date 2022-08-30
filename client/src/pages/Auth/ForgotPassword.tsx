import styled from 'styled-components';
import { AuthType, useAuthContext } from '../../context/AuthContext';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { emailRegex } from '../../utils/validationRegex';
import { forgotPassword } from '../../services/auth';
import { toast } from 'react-toastify';
import { useState } from 'react';
import successIcon from '../../assets/successful-icon.png';
import Input from '../../components/Input';

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
    margin-bottom: 1rem;
  }

  .btn-container {
    display: flex;
    justify-content: center;
  }

  button {
    background-color: #7200a1;
    color: #fff;
    padding: 8px 24px;
    border-radius: 100rem;
    margin: 1rem 1rem 0 1rem;

    &:hover {
      filter: brightness(0.9);
    }
  }

  & .error {
    display: block;
    margin: 0.75rem;
    font-size: 1.2rem;
    color: #ff0a0a;
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

    & img {
      width: 3rem;
      margin-right: 1rem;
    }
  }
`;

interface FormState {
  email: string;
}

const initialValues: FormState = {
  email: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email không được để trống')
    .matches(emailRegex, 'Email không hợp lệ'),
});

const ForgotPassword = () => {
  const { changeAuthType } = useAuthContext();
  const changeToLogin = () => changeAuthType(AuthType.LOGIN);
  const [isResentEmail, setIsResentEmail] = useState<boolean>(false);

  const handleSendRequest = async (values: FormState) => {
    try {
      setIsResentEmail(false);
      await forgotPassword({ email: values.email });
      setIsResentEmail(true);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.msg);
      } else {
        toast.error('Có lỗi xảy ra');
      }
    }
  };

  return (
    <Container>
      {isResentEmail ? (
        <>
          <div className='resent-email'>
            <img src={successIcon} alt='' />
            <span>
              Email đã được gửi, vui lòng kiểm tra mail để lấy lại mật khẩu
            </span>
          </div>
          <div className='btn-container'>
            <button type='button' onClick={changeToLogin}>
              Trở lại login
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className='title'>Quên mật khẩu?</h3>
          <p>Nhập địa chỉ email đã đăng ký</p>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSendRequest}
            validationSchema={validationSchema}
          >
            {(formik) => (
              <Form style={{ width: '100%' }}>
                {/* <Field
                  type='text'
                  name='email'
                  placeholder='Enter email address'
                />
                <ErrorMessage name='email' component='span' className='error' /> */}
                <Input name='email' type='text' placeholder='Nhập email' />
                <div className='btn-container'>
                  <button type='button' onClick={changeToLogin}>
                    Trở lại login
                  </button>
                  <button type='submit'>Tiếp theo</button>
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}
    </Container>
  );
};

export default ForgotPassword;
