import { Menu } from '@mui/material';
import React from 'react';
import { MdMoreHoriz, MdOutlineAlarm } from 'react-icons/md';
import { useAudioContext } from '../../../context/AudioContext';
import ConfirmDialog from '../../ConfirmDialog';
import Modal from '../../Modal';
import QueueAlarm from './QueueAlarm';
import QueueMenu from './QueueMenu';
import { Container, TabButton } from './style';

const PlayerQueueHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openAlarm, setOpenAlarm] = React.useState<boolean>(false);
  const [openAlarmConfirm, setOpenAlarmConfirm] =
    React.useState<boolean>(false);
  const openMenu = Boolean(anchorEl);

  const openAlarmModal = () => {
    setOpenAlarm(true);
  };

  const closeAlarmModal = () => {
    setOpenAlarm(false);
  };

  const openAlarmConfirmModal = () => {
    setOpenAlarmConfirm(true);
  };

  const closeAlarmConfirmModal = () => {
    setOpenAlarmConfirm(false);
  };

  const { handleCloseQueue, audio_alarm, turnOffAudioAlarm } =
    useAudioContext();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickAlarm = () => {
    if (!audio_alarm) {
      openAlarmModal();
    } else {
      openAlarmConfirmModal();
    }
  };

  const handleTurnOffAlarm = () => {
    turnOffAudioAlarm();
    closeAlarmConfirmModal();
  };

  return (
    <>
      <ConfirmDialog
        desc='Bạn có chắc chắn muốn xóa hẹn giờ?'
        title='Xóa Hẹn Giờ'
        open={openAlarmConfirm}
        onCancel={closeAlarmConfirmModal}
        onOk={handleTurnOffAlarm}
      />

      <Modal
        maxWidth='xs'
        open={openAlarm}
        onClose={closeAlarmModal}
        // sx={{ maxWidth: '330px' }}
        PaperProps={{
          sx: { maxWidth: '330px', backgroundColor: 'transparent' },
        }}
      >
        <QueueAlarm closeAlarmModal={closeAlarmModal} />
      </Modal>
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
        <QueueMenu closeMenu={handleClose} closeQueue={handleCloseQueue} />
      </Menu>
      <Container>
        <div className='queue-header-tabs'>
          <TabButton active>Danh sách phát</TabButton>
          <TabButton>Nghe gần đây</TabButton>
        </div>
        <button
          style={{
            backgroundColor: audio_alarm ? '#7200a1' : 'hsla(0, 0%, 100%, 0.1)',
          }}
          onClick={handleClickAlarm}
          className='queue-header-action'
        >
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
