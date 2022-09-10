import { Menu } from '@mui/material';
import React from 'react';
import { playbackRateOptions } from '../../../constants/options';
import { useAudioContext } from '../../../context/AudioContext';
import { getAudioStateSelector } from '../../../redux/audioPlayer/audioPlayerSelectors';
import { useAppSelector } from '../../../redux/hooks';
import { disableClickEvent } from '../../../utils/common';
import { Container, SpeedItem, SpeedMenu } from './style';

const AudioPlaybackRate = () => {
  const { playback_rate } = useAppSelector(getAudioStateSelector);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { handleChangeAudioPlaybackRate } = useAudioContext();
  const openSpeedMenu = Boolean(anchorEl);
  // const [is_liked, setIsLiked] = useState<boolean>(song.is_liked);
  const handleOpenSpeedMenu = (event: React.MouseEvent<HTMLElement>) => {
    disableClickEvent(event);
    setAnchorEl(event.currentTarget);
  };
  const handleCloseSpeedMenu = () => {
    setAnchorEl(null);
  };

  const handleClickPlaybacRateItem = (value: number) => {
    handleChangeAudioPlaybackRate(value);
    handleCloseSpeedMenu();
  };

  return (
    <>
      <Menu
        onClick={disableClickEvent}
        id='song-speed-menu'
        MenuListProps={{
          'aria-labelledby': 'song-speed-button',
        }}
        anchorEl={anchorEl}
        open={openSpeedMenu}
        onClose={handleCloseSpeedMenu}
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
        <SpeedMenu className='speed-menu'>
          <ul>
            {playbackRateOptions
              .sort((a, b) => a.value - b.value)
              .map((so) => (
                <SpeedItem
                  onClick={() => handleClickPlaybacRateItem(so.value)}
                  active={so.value === playback_rate.value}
                  key={so.value}
                >
                  {so.desc}
                </SpeedItem>
              ))}
          </ul>
        </SpeedMenu>
      </Menu>
      <Container>
        <button
          className='speed-btn'
          aria-label='more'
          id='song-speed-button'
          aria-controls={openSpeedMenu ? 'song-speed-menu' : undefined}
          aria-expanded={openSpeedMenu ? 'true' : undefined}
          aria-haspopup='true'
          onClick={handleOpenSpeedMenu}
        >
          {playback_rate.label}
        </button>
      </Container>
    </>
  );
};

export default AudioPlaybackRate;
