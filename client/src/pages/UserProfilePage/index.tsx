import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { MdCameraAlt } from 'react-icons/md';
import { useAuthContext } from '../../context/AuthContext';
import { Container } from './style';
import * as Yup from 'yup';
import { fullNameRegex } from '../../utils/validationRegex';
import { updateProfile } from '../../redux/auth/authActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createMetaSelector } from '../../redux/metadata/selectors';
import { toast } from 'react-toastify';
import { formatDateToInputDateFormat } from '../../utils/formatTime';
import { allowedImageFormat } from '../../utils/uploadFormat';
import useUploadFile from '../../hooks/useUploadFile';
import Progress from '../../components/LinearProgress';
import { clearMetaData } from '../../redux/metadata/actions';
import Modal from '../../components/Modal';
import ResetPasswordForm from '../../components/ResetPassword';
import { trimData } from '../../utils/formatFormData';

interface FormState {
  full_name: string;
  date_of_birth: string | null;
  address: string;
  phone: string;
  title: string;
  [key: string]: any;
}

const initialState: FormState = {
  address: '',
  date_of_birth: '',
  full_name: '',
  phone: '',
  title: '',
};

const validationSchema = Yup.object({
  full_name: Yup.string().required('Họ tên không được để trống'),
  // .matches(
  //   fullNameRegex,
  //   'Họ tên phải từ 3 đến 50 ký tự, chỉ bao gồm chữ hoa, chữ thường và số'
  // ),
});

const updateProfileMetaSelector = createMetaSelector(updateProfile);

const UserProfilePage = () => {
  const { authUser } = useAuthContext();
  const updateProfileMeta = useAppSelector(updateProfileMetaSelector);
  const dispatch = useAppDispatch();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isShowResetPasswordForm, setIsShowResetPassordForm] =
    useState<boolean>(false);

  const {
    url: profile_photo,
    handleUploadFile,
    isUploading,
    progress,
  } = useUploadFile();

  const handleSubmit = async (
    values: FormState,
    helpers: FormikHelpers<FormState>
  ) => {
    let params: any = {};
    let trimValues = trimData(values);
    for (let key in trimValues) {
      if (trimValues[key]) {
        params[key] = trimValues[key];
      }
    }

    if (params.date_of_birth) {
      params.date_of_birth = new Date(params.date_of_birth);
    }

    if (profile_photo) {
      params.profile_photo = profile_photo;
    }

    // console.log(params);
    dispatch(updateProfile(params));
  };

  const handleCloseResetPasswordForm = () => {
    setIsShowResetPassordForm(false);
  };

  const handleOpenResetPasswordForm = () => {
    setIsShowResetPassordForm(true);
  };

  useEffect(() => {
    return () => {
      dispatch(clearMetaData(updateProfile.typePrefix));
    };
  }, []);

  useEffect(() => {
    if (updateProfileMeta.loaded) {
      toast.success('Cập nhật thông tin cá nhân thành công');
    } else if (updateProfileMeta.error) {
      toast.error('Cập nhật thông tin thất bại');
    }
  }, [updateProfileMeta]);

  const handleClickUploadAvatar = () => {
    inputFileRef.current?.click();
  };

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const fileType = file.type;
    if (!allowedImageFormat.includes(fileType)) {
      toast.error('Định dạng ảnh không hỗ trợ');
      return;
    }

    toast.info('Một file đang được tải lên');
    handleUploadFile(file, '/images/');
  };

  return (
    <Container>
      <Modal
        open={isShowResetPasswordForm}
        onClose={handleCloseResetPasswordForm}
      >
        <ResetPasswordForm
          closeResetPasswordForm={handleCloseResetPasswordForm}
        />
      </Modal>
      <Formik
        initialValues={
          authUser
            ? {
                address: authUser.address || '',
                date_of_birth: formatDateToInputDateFormat(
                  authUser.date_of_birth
                ),
                full_name: authUser.full_name || '',
                phone: authUser.phone || '',
                title: authUser.title || '',
              }
            : initialState
        }
        enableReinitialize
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            <div className='form-group'>
              <div className='label'>
                <label>Ảnh đại diện</label>
              </div>

              <div>
                <div className='avatar'>
                  <input
                    type='file'
                    hidden
                    ref={inputFileRef}
                    onChange={handleChangeAvatar}
                  />
                  <img
                    src={profile_photo ?? authUser?.profile_photo}
                    alt=''
                    className='avatar-img'
                  />
                  <div className='camera' onClick={handleClickUploadAvatar}>
                    <MdCameraAlt />
                  </div>
                </div>

                {isUploading && (
                  <div style={{ width: '400px' }}>
                    <Progress value={progress} />
                  </div>
                )}
              </div>
            </div>

            <div className='form-group'>
              <div className='label'>
                <label htmlFor='full_name'>Họ tên</label>
              </div>
              <div className='input-container'>
                <Field
                  id='full_name'
                  name='full_name'
                  type='text'
                  placeholder='Tên đầy đủ'
                />
                <ErrorMessage
                  className='error'
                  name='full_name'
                  component='span'
                />
              </div>
            </div>

            <div className='form-group'>
              <div className='label'>
                <label htmlFor='email'>Email</label>
              </div>
              <input
                type='text'
                placeholder=''
                value={authUser?.email || ''}
                readOnly
              />
            </div>

            <div className='form-group'>
              <div className='label'>
                <label htmlFor='phone'>Số điện thoại</label>
              </div>
              <Field
                name='phone'
                id='phone'
                type='text'
                placeholder='Số điện thoại'
              />
            </div>

            <div className='form-group'>
              <div className='label'>
                <label htmlFor='date_of_birth'>Ngày sinh</label>
              </div>
              <Field name='date_of_birth' type='date' />
            </div>

            <div className='form-group'>
              <div className='label'>
                <label htmlFor='title'>Nghề nghiệp</label>
              </div>
              <Field
                id='title'
                type='text'
                name='title'
                placeholder='Nghề nghiệp'
              />
            </div>

            <div className='form-group'>
              <div className='label'>
                <label htmlFor='address'>Địa chỉ</label>
              </div>
              <Field
                type='text'
                id='address'
                placeholder='Địa chỉ'
                name='address'
              />
            </div>

            <div className='form-group'>
              <div className='label'>
                <label htmlFor='address'>Mật khẩu</label>
              </div>
              <button type='button' onClick={handleOpenResetPasswordForm}>
                Đổi mật khẩu
              </button>
            </div>

            <div className='btn-container'>
              <button
                type='submit'
                disabled={!formik.isValid || updateProfileMeta.pending}
              >
                Lưu lại
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default UserProfilePage;
