import React, { useEffect, useState } from 'react';
import { Container } from './style';
import { FiMusic } from 'react-icons/fi';
import { BsFillPlayFill } from 'react-icons/bs';
import { MdAdd } from 'react-icons/md';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { Song } from '../../services/song';
import { formatSongDuration } from '../../utils/formatTime';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/auth/authSlice';
import { AudioSong } from '../../redux/audioPlayer/audioPlayerSlice';
import {
  getAudioCurrentSongSelector,
  getAudioMetaSelector,
} from '../../redux/audioPlayer/audioPlayerSelectors';
import { changeFavourite } from '../../redux/song/songActions';
import { addSongsToPlaylistActions } from '../../redux/playlist/playlistActions';
import { disableClickEvent } from '../../utils/common';
import { RotatingLines } from 'react-loader-spinner';
import AudioPlayingIcon from '../AudioPlayingIcon';

interface Props {
  song: Song;
  playlist_id: string;
  onClickSongAudio?: (song: AudioSong) => void;
}

const RecommendPlaylistSongItem: React.FC<Props> = ({
  song,
  playlist_id,
  onClickSongAudio,
}) => {
  // console.log({ is_liked: song.is_liked });
  const audio_meta = useAppSelector(getAudioMetaSelector);
  const current_song = useAppSelector(getAudioCurrentSongSelector);
  const is_current_audio = current_song?.id === song.id;
  // const [is_liked, setIsLiked] = useState<boolean>(song.is_liked);
  const dispatch = useAppDispatch();

  const handleClickFavourite = async () => {
    try {
      const prev = song.is_liked;
      // setIsLiked((prev) => !prev);
      // await changeFavourite(song.id);
      dispatch(
        changeFavourite({
          data: song.id,
          onSuccess() {
            if (!prev) toast.success('Đã thêm bài hát vào thư viện');
            else toast.success('Đã xóa bài hát khỏi thư viện');
          },
        })
      );
    } catch (error: any) {
      toast.error(error.response?.data.msg || 'Có lỗi xảy ra');
      if (error.response?.status === 403) {
        localStorage.removeItem('music_token');
        dispatch(logout());
      }
    }
  };

  const handleAddSongToPlaylist = () => {
    dispatch(
      addSongsToPlaylistActions({
        data: {
          playlist_id,
          songs: [song],
        },
        onSuccess() {
          toast.success(
            `Đã thêm bài hát "${song.name} vào playlist thành công"`
          );
        },
        onError(error) {
          toast.error(error);
        },
      })
    );
  };

  const handleDoubleClickSong = () => {
    onClickSongAudio?.(song);
  };

  const renderSongIcon = (() => {
    if (current_song?.id !== song.id) {
      return (
        <BsFillPlayFill
          className='play-state'
          onClick={() => {
            onClickSongAudio?.(song);
          }}
        />
      );
    } else {
      if (audio_meta.is_audio_loading) {
        return (
          <span className='play-state'>
            <RotatingLines
              strokeColor='#ffffff'
              strokeWidth='5'
              animationDuration='0.75'
              width='15'
              visible={true}
            />
          </span>
        );
      }

      if (audio_meta.is_audio_playing) {
        return (
          <span
            className='play-state'
            onClick={() => {
              onClickSongAudio?.(song);
            }}
          >
            <AudioPlayingIcon width={20} />
          </span>
        );
      } else {
        return (
          <BsFillPlayFill
            className='play-state'
            onClick={() => {
              onClickSongAudio?.(song);
            }}
          />
        );
      }
    }
  })();

  return (
    <Container
      onDoubleClick={handleDoubleClickSong}
      is_current_audio={is_current_audio}
      is_liked={song.is_liked}
    >
      <div className='song-left'>
        <div className='music-icon'>
          <FiMusic />
        </div>

        <div
          className='song-thumbnail'
          onDoubleClick={disableClickEvent}
          onClick={() => {
            onClickSongAudio?.(song);
          }}
        >
          <img src={song.thumbnail} alt='' />
          <div className='opacity'></div>
          {renderSongIcon}
        </div>
        <div className='song-info'>
          <h4 className='name'>{song.name}</h4>
          <p className='singer'>{song.singer_name}</p>
        </div>
      </div>
      <div className='song-right'>
        <button
          className='favorite'
          onDoubleClick={disableClickEvent}
          onClick={handleClickFavourite}
        >
          {song.is_liked ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
        <span className='duration'>{formatSongDuration(song.duration)}</span>
        <div className='song-menu-wrapper'>
          <button
            className='more-action'
            onDoubleClick={disableClickEvent}
            onClick={handleAddSongToPlaylist}
          >
            <MdAdd />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default RecommendPlaylistSongItem;
