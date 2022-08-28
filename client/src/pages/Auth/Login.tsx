import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { Container } from './style';
import { Formik, Form, ErrorMessage, FormikHelpers, Field } from 'formik';
import { login } from '../../services/auth';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../redux/hooks';
import { loginSuccess } from '../../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

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

  const changeToSignup = () => changeAuthType('signup');
  const handleSubmit = async (
    values: FormState,
    formikHelpers: FormikHelpers<FormState>
  ) => {
    try {
      setIsLoading(true);
      const res = await login(values);
      dispatch(loginSuccess(res));

      // save the token to localstorage
      localStorage.setItem('music_token', res.access_token);

      closeAuthModal();
      toast.success('Đăng nhập thành công');
      if (redirectUrl) {
        navigate(redirectUrl);
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
      <h2 className='title'>Welcome back</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <Field name='email' type='text' placeholder='Email' id='email' />
              <ErrorMessage name='email' component='span' className='error' />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Mật khẩu</label>
              <Field
                type='password'
                name='password'
                id='password'
                placeholder='Mật khẩu'
              />
              <ErrorMessage
                name='password'
                component='span'
                className='error'
              />
            </div>

            <div className='nav'>
              Don't have account?{' '}
              <button type='button' onClick={changeToSignup}>
                Sign up
              </button>
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
