import emptyUploadImage from '../../../assets/empty-upload.png';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getUploadedSong } from '../../../redux/song/songActions';
import { getUsersUploadedSongs } from '../../../redux/song/songSelectors';
import SongItem from '../../../components/SongItem';
import Progress from '../../../components/LinearProgress';
import { useUploadContext } from '../../../context/UploadContext';
import { MAX_SONG_UPLOADED } from '../../../constants';
import { useAuthContext } from '../../../context/AuthContext';
import SongList from '../../../components/SongList';

export const NoSongContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* margin-top: 3rem; */
  align-items: center;

  & img {
    width: 120px;
  }

  & h3 {
    margin-top: 1rem;
    margin-bottom: 2rem;
    font-size: 1.6rem;
    line-height: 2.4rem;
    color: rgba(255, 255, 255, 0.5);
  }

  & button {
    background-color: rgb(114, 0, 161);
    color: #fff;
    font-size: 12px;
    padding: 9px 24px;
    text-transform: uppercase;
    border-radius: 10rem;
  }
`;

export const Container = styled.div`
  & .total-upload {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 15px;
    margin-bottom: 1rem;
    border-radius: 4px;

    & .left {
      flex-grow: 1;
      margin-right: 2rem;
      max-width: 36rem;

      span {
        color: #fff;
        font-size: 1.4rem;
        display: block;
        margin-bottom: 0.25rem;
      }

      .premium {
        background-color: #ffdb00;
        padding: 9px 24px;
        border-radius: 10rem;
        width: fit-content;
        color: #333;
        font-weight: 600;
        user-select: none;
      }
    }

    & .right {
      background-color: rgb(114, 0, 161);
      color: #fff;
      font-size: 12px;
      padding: 9px 24px;
      text-transform: uppercase;
      border-radius: 10rem;
    }
  }
`;

const UploadedSong = () => {
  const { openUploadForm } = useUploadContext();
  const dispatch = useAppDispatch();
  const firstRenderRef = useRef<boolean>(true);
  const songs = useAppSelector(getUsersUploadedSongs);
  const { authUser } = useAuthContext();

  const total_songs_uploaded = songs.length;

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    dispatch(getUploadedSong());
  }, []);

  return (
    <>
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
          <SongList songs={songs} />
        </Container>
      )}
    </>
  );
};

export default UploadedSong;
