import React, { useState } from 'react';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md';
import { editSong, SongPrivacy } from '../../services/song';
import { Menu } from '@mui/material';
import { BsCheck } from 'react-icons/bs';
import { PrivacyMenu } from './style';
import { toast } from 'react-toastify';
import { logout } from '../../redux/auth/authSlice';
import { useAppDispatch } from '../../redux/hooks';
import { privacyOptions } from '../../constants/options';

interface Props {
  song_id: string;
  initial_privacy: SongPrivacy;
  onChangePrivacySuccess: (new_privacy: SongPrivacy) => void;
}

const SongPrivary: React.FC<Props> = ({
  initial_privacy,
  song_id,
  onChangePrivacySuccess,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openPrivacyMenu = Boolean(anchorEl);
  const handleOpenPrivacyMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosePrivacyMenu = () => {
    setAnchorEl(null);
  };
  const dispatch = useAppDispatch();

  const [privacy, setPrivacy] = useState<SongPrivacy>(initial_privacy);

  const handleChangeSongPrivacy = async (new_privacy: SongPrivacy) => {
    if (new_privacy === privacy) return;

    try {
      await editSong({
        id: song_id,
        data: { privacy: new_privacy },
      });
      setPrivacy(new_privacy);

      toast.success(
        `Đã chuyển bài hát thành chế độ ${
          new_privacy === 'private' ? 'riêng tư' : 'công khai'
        }`
      );
      onChangePrivacySuccess(new_privacy);
      handleClosePrivacyMenu();
    } catch (error: any) {
      if (error.response?.status === 403) {
        localStorage.removeItem('music_token');
        dispatch(logout());
      }
    }
  };

  return (
    <div className='song-privacy'>
      <Menu
        id='song-privacy-menu'
        MenuListProps={{
          'aria-labelledby': 'song-privacy-button',
        }}
        anchorEl={anchorEl}
        open={openPrivacyMenu}
        onClose={handleClosePrivacyMenu}
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
        <PrivacyMenu>
          <ul>
            {privacyOptions.map((po, index) => (
              <li key={index} onClick={() => handleChangeSongPrivacy(po.value)}>
                <span>{po.label}</span>
                {po.value === privacy && <BsCheck />}
              </li>
            ))}
          </ul>
        </PrivacyMenu>
      </Menu>
      <button
        aria-label='more'
        id='song-privacy-button'
        aria-controls={openPrivacyMenu ? 'song-privacy-menu' : undefined}
        aria-expanded={openPrivacyMenu ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleOpenPrivacyMenu}
      >
        {privacy === 'private' ? <span>Cá nhân</span> : <span>Công khai</span>}

        {openPrivacyMenu ? (
          <MdOutlineKeyboardArrowUp />
        ) : (
          <MdOutlineKeyboardArrowDown />
        )}
      </button>
    </div>
  );
};

export default SongPrivary;
