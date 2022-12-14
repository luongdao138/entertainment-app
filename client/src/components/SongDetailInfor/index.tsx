import { Menu } from '@mui/material';
import React, { useRef, useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsFillPlayFill } from 'react-icons/bs';
import { MdPause, MdMoreHoriz } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useAudioContext } from '../../context/AudioContext';
import {
  getAudioCurrentSongSelector,
  getAudioMetaSelector,
} from '../../redux/audioPlayer/audioPlayerSelectors';
import { AudioSong } from '../../redux/audioPlayer/audioPlayerSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeFavourite } from '../../redux/song/songActions';
import { SongDetail } from '../../services/song';
import AudioPlayingIcon from '../AudioPlayingIcon';
import LoginRequired from '../LoginRequired';
import SongItemMenu from '../SongItemMenu';
import { Container } from './style';

interface Props {
  recommended_songs: AudioSong[];
  song: SongDetail;
}

const SongDetailInfor: React.FC<Props> = ({ song, recommended_songs }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openPlaylistMenu = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const [is_changed, setIsChanged] = useState<boolean>(false);
  const isFirstRender = useRef<boolean>(true);
  // const [is_playing, setIsPlaying] = useState<boolean>(false);
  const {
    handleClickSongAudio,
    handleAddSongsToPlayerQueue,
    handleAddSongToPlayNext,
    handleToggleAudioPlayState,
  } = useAudioContext();
  const current_song = useAppSelector(getAudioCurrentSongSelector);
  const { is_audio_playing, is_audio_loading } =
    useAppSelector(getAudioMetaSelector);
  // const [is_liked, setIsLiked] = useState<boolean>(song.is_liked);

  const is_current_audio = current_song?.id === song.id;
  const is_playing = is_audio_playing && song.id === current_song?.id;

  const handleClickMore = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();

    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickFavourite = async () => {
    const prevState = song.is_liked;
    // setIsLiked((prev) => !prev);
    dispatch(
      changeFavourite({
        data: song.id,
        onSuccess: () => {
          if (prevState) toast.success('???? x??a b??i h??t kh???i th?? vi???n');
          else toast.success('???? th??m b??i h??t v??o th?? vi??n');
        },
        onError(error) {
          toast.error(error);
        },
      })
    );
  };

  const onClickSongAudio = () => {
    if (is_audio_loading) return;

    if (is_current_audio) {
      // thay ?????i tr???ng th??i play/pause c???a b??i h??t
      handleToggleAudioPlayState();
    } else {
      handleClickSongAudio({
        song,
        list_songs: recommended_songs,
        playlist: null,
        is_from_recommend: true,
      });
    }
  };

  useEffect(() => {
    if (is_playing && !is_audio_loading) setIsChanged(true);
  }, [is_playing, is_audio_loading]);

  return (
    <Container
      is_liked={song.is_liked}
      is_changed={is_changed}
      is_playing={is_playing}
      is_current_audio={is_current_audio}
    >
      <Menu
        id='playlist-item-menu'
        MenuListProps={{
          'aria-labelledby': 'playlist-item-button',
        }}
        anchorEl={anchorEl}
        open={openPlaylistMenu}
        onClose={handleClose}
        sx={{
          '& .MuiList-root': {
            padding: 0,
          },
        }}
        PaperProps={{
          sx: {
            padding: 0,
            background: 'none',
            boxShadow: 'none',
          },
        }}
      >
        {/* Song menu here */}
        <SongItemMenu
          handleAddSongToPlayNext={handleAddSongToPlayNext}
          handleAddSongsToPlayerQueue={handleAddSongsToPlayerQueue}
          song={song}
          closeSongItemAction={handleClose}
        />
      </Menu>
      <div className='playlist-thumbnail-container' onClick={onClickSongAudio}>
        <div className='thumbnail-icon'>
          <button className='play-state'>
            {is_playing ? <AudioPlayingIcon /> : <BsFillPlayFill />}
          </button>
        </div>

        <div className='playlist-thumbnail'>
          <img src={song.thumbnail} alt='' />
          <div className='thumbnail-backdrop'></div>
        </div>
      </div>

      <div className='playlist-info-content'>
        <div className='playlist-name'>
          <h2>{song.name}</h2>
        </div>

        <p className='creator'>
          T???o b???i <span>{song.user.full_name}</span>
        </p>

        <p className='like-count'>188k ng?????i y??u th??ch</p>

        <button className='play-btn' onClick={onClickSongAudio}>
          {is_playing ? <MdPause /> : <BsFillPlayFill />}
          <span>
            {is_current_audio
              ? is_playing
                ? 'T???m d???ng'
                : 'Ti???p t???c ph??t'
              : 'Ph??t b??i h??t'}
          </span>
        </button>

        <div className='playlist-actions'>
          <LoginRequired>
            <button className='action favorite' onClick={handleClickFavourite}>
              {song.is_liked ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
          </LoginRequired>

          <button
            aria-label='more'
            id='playlist-item-button'
            aria-controls={openPlaylistMenu ? 'playlist-item-menu' : undefined}
            aria-expanded={openPlaylistMenu ? 'true' : undefined}
            aria-haspopup='true'
            onClick={handleClickMore}
            className='action more-btn'
          >
            <MdMoreHoriz />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default SongDetailInfor;
