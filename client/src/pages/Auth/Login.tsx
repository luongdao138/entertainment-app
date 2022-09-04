import React, { useState } from 'react';
import { AuthType, useAuthContext } from '../../context/AuthContext';
import { Container } from './style';
import { Formik, Form, FormikHelpers } from 'formik';
import { login } from '../../services/auth';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../redux/hooks';
import { loginSuccess } from '../../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import appRoutes from '../../constants/appRoutes';
import Input from '../../components/Input';
import { trimData } from '../../utils/formatFormData';

interface FormState {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email không được để trống')
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Email không hợp lệ'
    ),
  password: Yup.string().required('Mật khẩu không được để trống'),
});

const initialValues: FormState = {
  email: '',
  password: '',
};

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { changeAuthType, closeAuthModal, redirectUrl } = useAuthContext();

  const changeToSignup = () => changeAuthType(AuthType.SIGNUP);
  const changeToForgotPassword = () => changeAuthType(AuthType.FORGOT_PASSWORD);

  const handleSubmit = async (
    values: FormState,
    formikHelpers: FormikHelpers<FormState>
  ) => {
    try {
      // console.log(trimData(values));
      setIsLoading(true);
      const res = await login(trimData(values));
      dispatch(loginSuccess(res));

      // save the token to localstorage
      localStorage.setItem('music_token', res.access_token);

      closeAuthModal();
      toast.success('Đăng nhập thành công');
      if (redirectUrl) {
        navigate(redirectUrl);
      } else {
        navigate(appRoutes.HOME);
      }
    } catch (error: any) {
      if (!error.response) {
        toast.error('Server not response!');
      } else {
        toast.error(error.response.data.msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className='logo'>
        <img
          src='https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg'
          alt='logo'
        />
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <Input name='email' type='text' label='Email' placeholder='Email' />
            <Input
              name='password'
              type='password'
              label='Mật khẩu'
              placeholder='Mật khẩu'
            />

            <button
              type='button'
              className='forgot-pw'
              onClick={changeToForgotPassword}
            >
              Forgot your password
            </button>
            <div>
              <div className='nav'>
                Don't have account?{' '}
                <button type='button' onClick={changeToSignup}>
                  Sign up
                </button>
              </div>
            </div>

            <button
              type='submit'
              disabled={isLoading || !formik.isValid}
              className='submit-btn'
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
