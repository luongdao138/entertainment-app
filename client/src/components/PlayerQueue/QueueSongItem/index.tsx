import { Menu } from '@mui/material';
import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsFillPlayFill } from 'react-icons/bs';
import { MdMoreHoriz } from 'react-icons/md';
import { toast } from 'react-toastify';
import {
  getAudioArchivedListSelector,
  getAudioMetaSelector,
} from '../../../redux/audioPlayer/audioPlayerSelectors';
import { logout } from '../../../redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { changeFavourite } from '../../../redux/song/songActions';
import { Song } from '../../../services/song';
import { disableClickEvent } from '../../../utils/common';
import AudioPlayingIcon from '../../AudioPlayingIcon';
import SongItemMenu from '../../SongItemMenu';
import MyTooltip from '../../Tooltip';
import { Container } from './style';

interface Props {
  song: Song;
  is_dragging?: boolean;
  can_remove_out_of_queue?: boolean;
  onRemoveSongOutOfQueue?: (queue_id: string) => void;
  onClickQueueSong: (song: Song) => void;
  disable_add_to_play_next?: boolean;
  disable_add_to_player_queue?: boolean;
  can_play_with_lyric?: boolean;
}

const QueueSongItem: React.FC<Props> = ({
  song,
  can_remove_out_of_queue,
  onRemoveSongOutOfQueue,
  is_dragging,
  onClickQueueSong,
  disable_add_to_play_next,
  disable_add_to_player_queue,
  can_play_with_lyric,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openSongMenu = Boolean(anchorEl);
  const archive_list = useAppSelector(getAudioArchivedListSelector);
  const { is_audio_playing } = useAppSelector(getAudioMetaSelector);

  const is_current_audio = song.is_current_audio;
  const is_playing = is_current_audio && is_audio_playing;
  // audio_list_songs[current_audio_index]?.queue_id === song.queue_id;
  const is_archive = archive_list.some(
    (x) => x.queue_id === song.queue_id && !x.is_current_audio
  );

  const dispatch = useAppDispatch();
  // const [is_liked, setIsLiked] = useState<boolean>(song.is_liked);
  const handleOpenSongMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseSongMenu = () => {
    setAnchorEl(null);
  };

  const handleClickFavourite = async () => {
    try {
      const prev = song.is_liked;
      // setIsLiked((prev) => !prev);
      // await changeFavourite(song.id);
      dispatch(
        changeFavourite({
          data: song.id,
          onSuccess() {
            if (!prev) toast.success('???? th??m b??i h??t v??o th?? vi???n');
            else toast.success('???? x??a b??i h??t kh???i th?? vi???n');
          },
        })
      );
    } catch (error: any) {
      toast.error(error.response?.data.msg || 'C?? l???i x???y ra');
      if (error.response?.status === 403) {
        localStorage.removeItem('music_token');
        dispatch(logout());
      }
    }
  };

  return (
    <>
      <Menu
        id='song-item-menu'
        MenuListProps={{
          'aria-labelledby': 'song-item-button',
        }}
        anchorEl={anchorEl}
        open={openSongMenu}
        onClose={handleCloseSongMenu}
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
        <SongItemMenu
          song={song}
          closeSongItemAction={handleCloseSongMenu}
          disable_add_to_play_next={disable_add_to_play_next}
          disable_add_to_player_queue={disable_add_to_player_queue}
          can_remove_out_of_queue={can_remove_out_of_queue}
          onRemoveSongOutOfQueue={onRemoveSongOutOfQueue}
          can_play_with_lyric={can_play_with_lyric}
        />
      </Menu>
      <Container
        is_liked={song.is_liked}
        is_archive={is_archive}
        is_current_audio={is_current_audio}
        is_dragging={is_dragging}
        onDoubleClick={() => onClickQueueSong(song)}
      >
        <div className='song-left'>
          <div
            className='song-thumbnail'
            onDoubleClick={disableClickEvent}
            onClick={() => onClickQueueSong(song)}
          >
            <img src={song.thumbnail} alt='' />
            <div className='opacity'></div>
            {is_playing ? (
              <span className='play-state'>
                <AudioPlayingIcon width={20} />
              </span>
            ) : (
              <BsFillPlayFill className='play-state' />
            )}
          </div>
          <div className='song-info'>
            <h4 className='name'>{song.name}</h4>
            <p className='singer'>{song.singer_name}</p>
          </div>
        </div>
        <div className='song-right'>
          <MyTooltip
            title={song.is_liked ? 'X??a kh???i th?? vi???n' : 'Th??m v??o th?? vi???n'}
            placement='top'
          >
            <button
              onDoubleClick={disableClickEvent}
              className='favourite action'
              onClick={handleClickFavourite}
            >
              {song.is_liked ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
          </MyTooltip>
          <MyTooltip title='Kh??c' placement='top'>
            <button
              onDoubleClick={disableClickEvent}
              aria-label='more'
              id='song-item-button'
              aria-controls={openSongMenu ? 'song-item-menu' : undefined}
              aria-expanded={openSongMenu ? 'true' : undefined}
              aria-haspopup='true'
              onClick={handleOpenSongMenu}
              className='more-btn action'
            >
              <MdMoreHoriz />
            </button>
          </MyTooltip>
        </div>
      </Container>
    </>
  );
};

export default QueueSongItem;
