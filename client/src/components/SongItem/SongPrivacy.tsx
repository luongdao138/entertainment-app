import React, { useState } from 'react';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md';
import { SongPrivacy } from '../../services/song';
import { Menu } from '@mui/material';
import { BsCheck } from 'react-icons/bs';
import { PrivacyMenu } from './style';

interface Props {
  song_id: string;
  initial_privacy: SongPrivacy;
}

const privacyOptions = [
  {
    label: 'Cá nhân',
    value: 'private',
  },
  {
    label: 'Công khai',
    value: 'public',
  },
];

const SongPrivary: React.FC<Props> = ({ initial_privacy, song_id }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openPrivacyMenu = Boolean(anchorEl);
  const handleOpenPrivacyMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosePrivacyMenu = () => {
    setAnchorEl(null);
  };
  const [privacy, setPrivacy] = useState<SongPrivacy>(initial_privacy);

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
              <li key={index}>
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
