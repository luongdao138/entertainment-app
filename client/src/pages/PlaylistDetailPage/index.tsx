import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsFillPlayFill } from 'react-icons/bs';
import { MdMoreHoriz, MdOutlineModeEdit, MdPause } from 'react-icons/md';
import { useAuthContext } from '../../context/AuthContext';
import { Container } from './style';
import { HiOutlineMusicNote } from 'react-icons/hi';
import AudioLoadingIcon from '../../components/AudioPlayingIcon';
import { Menu } from '@mui/material';
import PlaylistItemMenu from '../../components/PlaylistItemMenu';
import SongList from '../../components/SongList';
import { v4 as uuid } from 'uuid';
import { Song } from '../../services/song';
import PlaylistRecommendSongs from '../../components/PlaylistRecommendSongs';
import ArtistItem from '../../components/ArtistItem';
import PlaylistItem from '../../components/PlaylistItem';

const mockSongs: Song[] = [...new Array(6)].fill({}).map(() => ({
  id: uuid(),
  created_at: new Date(),
  duration: 170,
  is_liked: false,
  name: 'Ngân hà và vì sao',
  singer_name: 'Tiểu lam bối tâm',
  thumbnail:
    'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/3/b/5/9/3b5928ebe6a396a280104733e0e71f5c.jpg',
  updated_at: new Date(),
  url: '',
}));

const PlaylistDetailPage = () => {
  const { authUser } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openPlaylistMenu = Boolean(anchorEl);

  const [is_playing, setIsPlaying] = useState<boolean>(false);
  const [is_liked, setIsLiked] = useState<boolean>(false);
  const [is_changed, setIsChanged] = useState<boolean>(false);
  const [is_current_audio, setIsCurrentAudio] = useState<boolean>(false);

  const handleChangePlayState = () => {
    setIsChanged(true);
    setIsPlaying((prev) => !prev);
  };

  const handleClickMore = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();

    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container
      is_changed={is_changed}
      is_liked={is_liked}
      is_playing={is_playing}
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
        <PlaylistItemMenu
          playlist_id={''}
          can_delete={false}
          can_edit={false}
          onOpenDeleteConfirmModal={() => {}}
          onOpenEditForm={() => {}}
        />
      </Menu>

      <div className='detail-top'>
        <div className='playlist-info'>
          <div
            className='playlist-thumbnail-container'
            onClick={handleChangePlayState}
          >
            <div className='thumbnail-icon'>
              <button className='play-state'>
                {is_playing ? <AudioLoadingIcon /> : <BsFillPlayFill />}
              </button>
            </div>
            <div className='playlist-thumbnail'>
              <img
                src='https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/0/0/1/c/001c7c81cd5f1c1e53233967d42fd7aa.jpg'
                alt=''
              />
              <div className='thumbnail-backdrop'></div>
            </div>
          </div>

          <div className='playlist-info-content'>
            <div className='playlist-name'>
              <h2>Nhạc Hoa hay nhất</h2>
              <button>
                <MdOutlineModeEdit />
              </button>
            </div>

            <p className='creator'>
              Tạo bởi <span>Đào Văn Lương</span>
            </p>

            <p className='privacy'>Công khai</p>
            <p className='like-count'>188k người yêu thích</p>

            <button className='play-btn'>
              {is_playing ? <MdPause /> : <BsFillPlayFill />}
              <span>
                {is_current_audio
                  ? is_playing
                    ? 'Tạm dừng'
                    : 'Tiếp tục phát'
                  : 'Phát ngẫu nhiên'}
              </span>
            </button>

            <div className='playlist-actions'>
              <button className='action favorite'>
                {is_liked ? <AiFillHeart /> : <AiOutlineHeart />}
              </button>

              <button
                aria-label='more'
                id='playlist-item-button'
                aria-controls={
                  openPlaylistMenu ? 'playlist-item-menu' : undefined
                }
                aria-expanded={openPlaylistMenu ? 'true' : undefined}
                aria-haspopup='true'
                onClick={handleClickMore}
                className='action more-btn'
              >
                <MdMoreHoriz />
              </button>
            </div>
          </div>
        </div>
        <div className='playlist-songs'>
          <div className='no-songs'>
            <HiOutlineMusicNote />
            <p>Không có bài hát nào trong playlist của bạn</p>
          </div>

          <div className='playlist-songs-main'>
            <SongList songs={mockSongs} />

            <div className='song-count'>
              <p className='count'>2 bài hát</p>
              <p className='time'>7 phút</p>
            </div>
          </div>

          <div className='playlist-songs-recommend'>
            <PlaylistRecommendSongs songs={mockSongs} />
          </div>
        </div>
      </div>

      <div className='involved-artists group'>
        <h2 className='title'>Nghệ sĩ tham gia</h2>
        <div className='group-list'>
          {[...new Array(4)].map((_, index) => (
            <ArtistItem key={index} />
          ))}
        </div>
      </div>

      <div className='group'>
        <h2 className='title'>Có thể bạn quan tâm</h2>
        <div className='group-list'>
          {[...new Array(4)].map((_, index) => (
            <PlaylistItem
              playlist={{
                can_delete: false,
                can_edit: false,
                id: uuid(),
                created_at: new Date(),
                creator: {
                  full_name: 'Dao Van Luong',
                  id: '1',
                },
                is_owner: false,
                play_random: true,
                privacy: 'private',
                public_at: new Date(),
                thumbnail:
                  'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/7/4/f/f/74ffe8e0389cd62ac5a8c82297260373.jpg',
                title: 'Nhạc hoa thịnh hành',
                updated_at: new Date(),
                is_liked: false,
              }}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PlaylistDetailPage;
