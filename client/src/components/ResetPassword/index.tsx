import React, { useEffect } from 'react';
import { Container } from './style';
import * as Yup from 'yup';
import { passwordRegex } from '../../utils/validationRegex';
import { Form, Formik, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createMetaSelector } from '../../redux/metadata/selectors';
import { resetUserPassword } from '../../redux/auth/authActions';
import { clearMetaData } from '../../redux/metadata/actions';
import Input from '../Input';

interface Props {
  closeResetPasswordForm: () => void;
}

interface FormState {
  password: string;
  new_password: string;
  cf_new_password: string;
}

const initialValues: FormState = {
  cf_new_password: '',
  new_password: '',
  password: '',
};

const validationSchema = Yup.object({
  password: Yup.string().required('Mật khẩu hiện tại không được để trống'),
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

const resetPasswordMetaSelector = createMetaSelector(resetUserPassword);

const ResetPasswordForm: React.FC<Props> = ({ closeResetPasswordForm }) => {
  const dispatch = useAppDispatch();
  const resetPasswordMeta = useAppSelector(resetPasswordMetaSelector);
  const handleSubmit = (
    values: FormState,
    helpers: FormikHelpers<FormState>
  ) => {
    if (values.new_password === values.password) {
      toast.error('Mật khẩu mới không được trùng với mật khẩu cũ');
      return;
    }

    dispatch(
      resetUserPassword({
        new_password: values.new_password,
        password: values.password,
      })
    );
  };

  useEffect(() => {
    if (resetPasswordMeta.loaded) {
      closeResetPasswordForm();
    }
  }, [resetPasswordMeta]);

  useEffect(() => {
    return () => {
      dispatch(clearMetaData(resetUserPassword.typePrefix));
    };
  }, []);

  return (
    <Container>
      <h2 className='title'>Đổi mật khẩu</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            <Input
              name='password'
              type='password'
              placeholder='Nhập mật khẩu cũ'
              label='Mật khẩu cũ'
            />
            <Input
              name='new_password'
              type='password'
              placeholder='Nhập mật khẩu mới'
              label='Mật khẩu mới'
            />
            <Input
              name='cf_new_password'
              type='password'
              placeholder='Xác nhân mật khẩu mới'
              label='Xác nhận mật khẩu mới'
            />

            <div className='btn-container'>
              <button
                type='submit'
                disabled={resetPasswordMeta.pending || !formik.isValid}
              >
                Đổi mật khẩu
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ResetPasswordForm;
