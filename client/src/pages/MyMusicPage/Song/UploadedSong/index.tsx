import emptyUploadImage from '../../../../assets/empty-upload.png';
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import {
  deleteUploadSongAction,
  getUploadedSong,
} from '../../../../redux/song/songActions';
import { getUsersUploadedSongs } from '../../../../redux/song/songSelectors';
import Progress from '../../../../components/LinearProgress';
import { useUploadContext } from '../../../../context/UploadContext';
import { MAX_SONG_UPLOADED } from '../../../../constants';
import { useAuthContext } from '../../../../context/AuthContext';
import SongList from '../../../../components/SongList';
import { Container, NoSongContainer } from './style';
import Modal from '../../../../components/Modal';
import EditSongForm from '../../../../components/EditSongForm';
import { Song } from '../../../../services/song';
import ConfirmDialog from '../../../../components/ConfirmDialog';
import useDeleteFile from '../../../../hooks/useDeleteFile';

const UploadedSong = () => {
  const { openUploadForm } = useUploadContext();
  const dispatch = useAppDispatch();

  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [openEditSongForm, setOpenEditSongForm] = useState<boolean>(false);
  const deleteFile = useDeleteFile();
  // const firstRenderRef = useRef<boolean>(true);
  const songs = useAppSelector(getUsersUploadedSongs);
  const { authUser } = useAuthContext();
  const [openConfirmDeleteSongModal, setOpenDeleteSongConfirmModal] =
    useState<boolean>(false);

  const total_songs_uploaded = songs.length;

  const handleOpenDeleteConfirmModal = () => {
    setOpenDeleteSongConfirmModal(true);
  };

  const handleCloseDeleteConfirmModal = () => {
    setOpenDeleteSongConfirmModal(false);
  };

  const handleOpenEditSongForm = () => {
    setOpenEditSongForm(true);
  };

  const handleCloseEditSongForm = () => {
    setOpenEditSongForm(false);
  };

  const changeSelectedSong = (song: Song) => {
    setSelectedSong(song);
  };

  const handleDeleteUploadSong = async () => {
    if (selectedSong) {
      dispatch(
        deleteUploadSongAction({
          data: selectedSong.id,
          onSuccess(res) {
            deleteFile(selectedSong.thumbnail);
          },
        })
      );
      handleCloseDeleteConfirmModal();
    }
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
        <EditSongForm
          closeEditSongModal={handleCloseEditSongForm}
          editedSong={selectedSong}
        />
      </Modal>

      {openConfirmDeleteSongModal && (
        <ConfirmDialog
          title='Xóa Bài Hát'
          desc='Bài hát của bạn sẽ bị xóa khỏi hệ thống, bạn có muốn xóa'
          onCancel={handleCloseDeleteConfirmModal}
          onOk={handleDeleteUploadSong}
          open={openConfirmDeleteSongModal}
          onClose={handleCloseDeleteConfirmModal}
        />
      )}

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
            handleOpenDeleteConfirmModal={handleOpenDeleteConfirmModal}
            changeSelectedSong={changeSelectedSong}
            can_remove_out_of_upload
            enable_select_multiple
          />
        </Container>
      )}
    </>
  );
};

export default UploadedSong;
