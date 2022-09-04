import { Form, Formik } from 'formik';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import * as Yup from 'yup';
import Input from '../../components/Input';
import appRoutes from '../../constants/appRoutes';
import { useAuthContext } from '../../context/AuthContext';
import { changePassword } from '../../services/auth';
import { trimData } from '../../utils/formatFormData';
import { passwordRegex } from '../../utils/validationRegex';

const Container = styled.div`
  /* display: flex; */
  max-width: 500px;
  margin: auto;
  padding-top: 7rem;
  & .title {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 3rem;
    color: #fff;
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

interface FormState {
  new_password: string;
  cf_new_password: string;
}

const initialValues: FormState = {
  cf_new_password: '',
  new_password: '',
};

const validationSchema = Yup.object({
  new_password: Yup.string()
    .required('Mật khẩu không được để trống')
    .matches(
      passwordRegex,
      'Mật khẩu phải từ 8 đến 24 ký tự, bao gồm ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt'
    ),
  cf_new_password: Yup.string()
    .required('Xác nhận mật khẩu không được để trống')
    .oneOf([Yup.ref('new_password'), null], 'Xác nhận mật khẩu chưa chính xác'),
});

const RetrievePassword = () => {
  const [params] = useSearchParams();
  const token = params.get('token') || '';
  const navigate = useNavigate();
  const { openAuthModal } = useAuthContext();

  const handleChangePassword = async (values: FormState) => {
    const trimValues = trimData(values);
    try {
      await changePassword({ token, new_password: trimValues.new_password });
      toast.success('Đổi mật khẩu thành công');
      navigate(appRoutes.HOME);
      openAuthModal();
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
      <h2 className='title'>Đặt lại mật khẩu</h2>

      {
        <Formik
          initialValues={initialValues}
          onSubmit={handleChangePassword}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form>
              <Input
                type='password'
                placeholder='Mật khẩu mới'
                name='new_password'
                label='Mật khẩu'
              />
              <Input
                type='password'
                placeholder='Xác nhận lại mật khẩu mới'
                name='cf_new_password'
                label='Xác nhận mật khẩu'
              />
              <button type='submit' className='submit-btn'>
                Lưu lại
              </button>
            </Form>
          )}
        </Formik>
      }
    </Container>
  );
};

export default RetrievePassword;
