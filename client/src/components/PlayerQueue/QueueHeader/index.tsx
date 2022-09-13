import { Menu } from '@mui/material';
import React from 'react';
import { MdMoreHoriz, MdOutlineAlarm } from 'react-icons/md';
import { useAudioContext } from '../../../context/AudioContext';
import { PlayerQueueTab } from '../../../layout/components/PlayerQueue';
import ConfirmDialog from '../../ConfirmDialog';
import Modal from '../../Modal';
import Tabs from '../../Tabs';
import QueueAlarm from './QueueAlarm';
import QueueMenu from './QueueMenu';
import { Container } from './style';

interface Props {
  tab: PlayerQueueTab;
  changeTab: (tab: PlayerQueueTab) => void;
}

interface TabOption {
  label: string;
  value: PlayerQueueTab;
}

const tabOptions: TabOption[] = [
  {
    label: 'Danh sách phát',
    value: 'player',
  },
  {
    label: 'Nghe gần đây',
    value: 'recent',
  },
];

const PlayerQueueHeader: React.FC<Props> = ({ changeTab, tab }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openAlarm, setOpenAlarm] = React.useState<boolean>(false);
  const [openAlarmConfirm, setOpenAlarmConfirm] =
    React.useState<boolean>(false);
  const openMenu = Boolean(anchorEl);
  const { handleCloseQueue, openPlayer, audio_alarm, turnOffAudioAlarm } =
    useAudioContext();

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
        <Tabs
          value={tab}
          onChange={(value) => changeTab(value as PlayerQueueTab)}
          options={tabOptions}
        />
        <button
          style={{
            backgroundColor: audio_alarm ? '#7200a1' : 'hsla(0, 0%, 100%, 0.1)',
          }}
          onClick={handleClickAlarm}
          className='queue-header-action'
          disabled={!openPlayer}
        >
          <MdOutlineAlarm />
        </button>
        <button
          disabled={!openPlayer}
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
