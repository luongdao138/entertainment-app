import React from 'react';
import { BsUpload } from 'react-icons/bs';
import { Container } from './style';
import { Formik, Form } from 'formik';
import Input from '../Input';
import MySelect from '../Select';

interface Props {
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

const EditSongForm: React.FC<Props> = ({ closeEditSongModal }) => {
  const handleSubmit = (values: FormState) => {
    console.log(values);
  };
  return (
    <Container>
      <h2 className='title'>Chỉnh sửa</h2>
      <div className='edit-song-main'>
        <div className='edit-song-left'>
          <img
            src='https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/d/7/2/4/d724c272c39780e21e6eb980d449137f.jpg'
            alt=''
          />
          <button className='upload-image'>
            <span>Tải lên</span>
            <BsUpload />
          </button>
        </div>
        <div className='edit-song-right'>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {(formik) => (
              <Form>
                <Input name='name' placeholder='Tên bài hát' type='text' />
                <div className='column-2'>
                  <Input
                    name='singer_name'
                    placeholder='Nghệ sĩ'
                    type='singer_name'
                  />
                  <MySelect
                    name='category'
                    options={[
                      {
                        label: 'Nhạc trẻ',
                        value: 'Nhạc trẻ',
                      },
                      {
                        label: 'Nhạc trung quốc',
                        value: 'Nhạc trung quốc',
                      },
                    ]}
                  />
                  {/* <Input name='singer_name' placeholder='Nghệ sĩ' type='text' /> */}
                </div>
                <div className='btns'>
                  <button type='button'>Đóng</button>
                  <button type='submit'>Lưu</button>
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
