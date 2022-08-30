import React, { useState } from 'react';
import { AuthType, useAuthContext } from '../../context/AuthContext';
import { Container } from './style';
import * as Yup from 'yup';
import { Formik, Form, FormikHelpers } from 'formik';
import { signup } from '../../services/auth';
import { toast } from 'react-toastify';
import {
  emailRegex,
  fullNameRegex,
  passwordRegex,
} from '../../utils/validationRegex';
import Input from '../../components/Input';

interface FormState {
  full_name: string;
  email: string;
  password: string;
  cf_password: string;
}

const initialValues: FormState = {
  cf_password: '',
  email: '',
  full_name: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email không được để trống')
    .matches(emailRegex, 'Email không hợp lệ'),
  password: Yup.string()
    .required('Mật khẩu không được để trống')
    .matches(
      passwordRegex,
      'Mật khẩu phải từ 8 đến 24 ký tự, bao gồm ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt'
    ),
  full_name: Yup.string()
    .required('Họ tên không được để trống')
    .matches(
      fullNameRegex,
      'Họ tên phải từ 3 đến 50 ký tự, chỉ bao gồm chữ hoa, chữ thường và số'
    ),
  cf_password: Yup.string()
    .required('Xác nhận mật khẩu không được để trống')
    .oneOf([Yup.ref('password'), null], 'Xác nhận mật khẩu chưa chính xác'),
});

const SignUp = () => {
  const { changeAuthType, setRegistrationEmail } = useAuthContext();
  const changeToLogin = () => changeAuthType(AuthType.LOGIN);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (
    values: FormState,
    formikHelpers: FormikHelpers<FormState>
  ) => {
    try {
      setIsLoading(true);
      await signup({
        email: values.email,
        full_name: values.full_name,
        password: values.password,
      });

      toast.success('Đăng ký thành công');
      setRegistrationEmail(values.email);
      changeAuthType(AuthType.SIGNUP_SUCCESS);
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
      <h2 className='title'>Start for free</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            <Input
              name='full_name'
              type='text'
              label='Tên đầy đủ'
              placeholder='Họ tên'
            />
            <Input name='email' type='text' label='Email' placeholder='Email' />
            <Input
              name='password'
              type='password'
              label='Mật khẩu'
              placeholder='Mật khẩu'
            />
            <Input
              name='cf_password'
              type='password'
              label='Xác nhận mật khẩu'
              placeholder='Nhập lại mật khảu'
            />

            <div className='nav'>
              Already have an account?{' '}
              <button onClick={changeToLogin}>Sign in</button>
            </div>

            <button
              className='submit-btn'
              disabled={!formik.isValid || isLoading}
            >
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default SignUp;
