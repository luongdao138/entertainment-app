import React, { useEffect, useRef, useState } from 'react';
import { BsUpload } from 'react-icons/bs';
import { Container } from './style';
import { Formik, Form } from 'formik';
import Input from '../Input';
import MyAutoComplete from '../AutoComplete';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllCategoriesActions } from '../../redux/category/categoryActions';
import { getAllCategoriesSelector } from '../../redux/category/categorySelectors';
import { editSong, Song } from '../../services/song';
import { editSongSucess } from '../../redux/song/songSlice';
import { toast } from 'react-toastify';
import { logout } from '../../redux/auth/authSlice';
import { allowedImageFormat } from '../../utils/uploadFormat';
import useUploadFile from '../../hooks/useUploadFile';
import { ReactComponent as LoadingSpinner } from '../../assets/loading-spinner.svg';
import _ from 'lodash';
import useDeleteFile from '../../hooks/useDeleteFile';
import * as Yup from 'yup';
import { trimData } from '../../utils/formatFormData';
interface Props {
  editedSong: Song | null;
  closeEditSongModal: () => void;
}

interface FormState {
  name: string;
  singer_name: string;
  category: string;
}

const initialValues: FormState = {
  name: '',
  category: '',
  singer_name: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required('Tên bài hát không được để trống'),
  singer_name: Yup.string().required('Tên nghệ sĩ không được để trống'),
});

const EditSongForm: React.FC<Props> = ({ closeEditSongModal, editedSong }) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(getAllCategoriesSelector);
  const [changed_urls, setChangedUrl] = useState<string[]>([]);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const deleteFile = useDeleteFile();
  const { handleUploadFile, isUploading, progress, url } = useUploadFile();

  // const isFirstRenderRef = useRef<boolean>(true)
  const handleSubmit = async (values: FormState) => {
    let trimValues = trimData(values);
    const { category, ...rest } = trimValues;
    const belong_categories = category
      .split(',')
      .filter((id: string) => Boolean(id));
    if (editedSong) {
      try {
        await editSong({
          id: editedSong.id,
          data: {
            ...rest,
            categories: belong_categories,
            thumbnail: url ?? editedSong.thumbnail,
          },
        });

        let deleted_urls = _.clone(changed_urls);
        deleted_urls.pop();
        if (changed_urls.length > 0) {
          deleted_urls.push(editedSong.thumbnail);
        }

        dispatch(
          editSongSucess({
            song: {
              ...editedSong,
              ...rest,
              thumbnail: url ?? editedSong.thumbnail,
              belong_categories: belong_categories.map((x: string) => ({
                id: x,
              })),
            },
          })
        );
        closeEditSongModal();
        toast.success('Chỉnh sửa bài hát thành công');

        // remove redundant files
        for (const deleted_url of deleted_urls) {
          deleteFile(deleted_url);
        }
      } catch (error: any) {
        if (error.response?.status === 403) {
          localStorage.removeItem('music_token');
          dispatch(logout());
        }
      }
    }
  };

  const handleClickUpload = () => {
    inputFileRef.current?.click();
  };

  const handleUploadNewSongThumbnail = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const type = file.type;

    if (!allowedImageFormat.includes(type)) {
      toast.error('Định dạng ảnh không hợp lệ');
      return;
    }

    handleUploadFile(file, '/images/', (url) => {
      setChangedUrl((prev) => [...prev, url]);
    });
  };

  useEffect(() => {
    // if(isFirstRenderRef.current) {
    //    isFirstRenderRef.current = false;
    //    return;
    // }

    dispatch(getAllCategoriesActions());
  }, []);

  if (!editedSong) return null;

  return (
    <Container isUploading={isUploading}>
      <h2 className='title'>Chỉnh sửa</h2>
      <div className='edit-song-main'>
        <div onClick={handleClickUpload} className='edit-song-left'>
          <img src={url ?? editedSong.thumbnail} alt='' />
          <input
            onChange={handleUploadNewSongThumbnail}
            ref={inputFileRef}
            type='file'
            hidden
          />
          <button className='upload-image'>
            <span>Tải lên</span>
            <BsUpload />
          </button>

          <div className='opacity'>
            <LoadingSpinner />
          </div>
        </div>
        <div className='edit-song-right'>
          <Formik
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={
              editedSong
                ? {
                    category: editedSong.belong_categories
                      .map((c) => c.id)
                      .join(','),
                    name: editedSong.name,
                    singer_name: editedSong.singer_name,
                  }
                : initialValues
            }
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form>
                <Input name='name' placeholder='Tên bài hát' type='text' />
                <Input
                  name='singer_name'
                  placeholder='Nghệ sĩ'
                  type='singer_name'
                />
                <MyAutoComplete
                  name='category'
                  options={categories.map((c) => ({
                    label: c.name,
                    value: c.id,
                  }))}
                />
                <div className='btns'>
                  <button type='button' onClick={closeEditSongModal}>
                    Đóng
                  </button>
                  <button
                    type='submit'
                    disabled={isUploading || !formik.isValid}
                  >
                    Lưu
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Container>
  );
};

export default EditSongForm;
