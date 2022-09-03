import emptyUploadImage from '../../../../assets/empty-upload.png';
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { getUploadedSong } from '../../../../redux/song/songActions';
import { getUsersUploadedSongs } from '../../../../redux/song/songSelectors';
import Progress from '../../../../components/LinearProgress';
import { useUploadContext } from '../../../../context/UploadContext';
import { MAX_SONG_UPLOADED } from '../../../../constants';
import { useAuthContext } from '../../../../context/AuthContext';
import SongList from '../../../../components/SongList';
import { Container, NoSongContainer } from './style';
import Modal from '../../../../components/Modal';
import EditSongForm from '../../../../components/EditSongForm';

const UploadedSong = () => {
  const { openUploadForm } = useUploadContext();
  const dispatch = useAppDispatch();
  const [openEditSongForm, setOpenEditSongForm] = useState<boolean>(false);
  // const firstRenderRef = useRef<boolean>(true);
  const songs = useAppSelector(getUsersUploadedSongs);
  const { authUser } = useAuthContext();

  const total_songs_uploaded = songs.length;

  const handleOpenEditSongForm = () => {
    setOpenEditSongForm(true);
  };

  const handleCloseEditSongForm = () => {
    setOpenEditSongForm(false);
  };

  useEffect(() => {
    // if (firstRenderRef.current) {
    //   firstRenderRef.current = false;
    //   return;
    // }

    dispatch(getUploadedSong());
  }, []);

  return (
    <>
      <Modal
        open={openEditSongForm}
        onClose={handleCloseEditSongForm}
        maxWidth='sm'
      >
        <EditSongForm closeEditSongModal={handleCloseEditSongForm} />
      </Modal>
      {!songs.length ? (
        <NoSongContainer>
          <img src={emptyUploadImage} alt='' />
          <h3>Chưa có bài hát trong thư viện cá nhân</h3>
          <button onClick={openUploadForm}>Tải lên ngay</button>
        </NoSongContainer>
      ) : (
        <Container>
          <div className='total-upload'>
            <div className='left'>
              {authUser?.is_premium ? (
                <span className='premium'>Premium</span>
              ) : (
                <>
                  <span>
                    Đã tải lên: {total_songs_uploaded}/{MAX_SONG_UPLOADED}
                  </span>
                  <Progress
                    value={Math.round(
                      (total_songs_uploaded * 100) / MAX_SONG_UPLOADED
                    )}
                  />
                </>
              )}
            </div>

            {total_songs_uploaded < 50 && (
              <button className='right' onClick={openUploadForm}>
                Tải lên ngay
              </button>
            )}
          </div>
          <SongList
            songs={songs}
            can_change_privacy
            can_delete_song
            can_edit_song
            handleOpenEditSongForm={handleOpenEditSongForm}
          />
        </Container>
      )}
    </>
  );
};

export default UploadedSong;
