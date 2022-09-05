import { Menu } from '@mui/material';
import React from 'react';
import { MdMoreHoriz, MdOutlineAlarm } from 'react-icons/md';
import QueueMenu from './QueueMenu';
import { Container, TabButton } from './style';

const PlayerQueueHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Menu
        id='queue-menu'
        MenuListProps={{
          'aria-labelledby': 'queue-button',
        }}
        anchorEl={anchorEl}
        open={openMenu}
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
        <QueueMenu />
      </Menu>
      <Container>
        <div className='queue-header-tabs'>
          <TabButton active>Danh sách phát</TabButton>
          <TabButton>Nghe gần đây</TabButton>
        </div>
        <button className='queue-header-action'>
          <MdOutlineAlarm />
        </button>
        <button
          className='queue-header-action'
          aria-label='more'
          id='queue-button'
          aria-controls={openMenu ? 'queue-menu' : undefined}
          aria-expanded={openMenu ? 'true' : undefined}
          aria-haspopup='true'
          onClick={handleClick}
        >
          <MdMoreHoriz />
        </button>
      </Container>
    </>
  );
};

export default PlayerQueueHeader;
