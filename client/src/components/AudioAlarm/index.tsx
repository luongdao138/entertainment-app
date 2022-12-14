import React, { useRef, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useAudioContext } from '../../context/AudioContext';
import { useLyricContext } from '../../context/LyricContext';
import useCountdown from '../../hooks/useCountdown';
import { getAudioMetaSelector } from '../../redux/audioPlayer/audioPlayerSelectors';
import { useAppSelector } from '../../redux/hooks';
import { disableClickEvent } from '../../utils/common';
import { formatSongDuration } from '../../utils/formatTime';
import ConfirmDialog from '../ConfirmDialog';
import { Container } from './style';

interface Props {
  audio_alarm: number;
  openConfirmModal: () => void;
}

const converToCountStart = (time: number) => {
  return Math.ceil((time - new Date().getTime()) / 1000);
};

const AudioAlarm: React.FC<Props> = ({ audio_alarm, openConfirmModal }) => {
  const { turnOffAudioAlarm } = useAudioContext();
  const { is_audio_playing } = useAppSelector(getAudioMetaSelector);
  const countStartRef = useRef<number>(converToCountStart(audio_alarm));
  const [openAlarmConfirm, setOpenAlarmConfirm] =
    React.useState<boolean>(false);

  const { open_lyric } = useLyricContext();

  const openAlarmConfirmModal = () => {
    setOpenAlarmConfirm(true);
  };

  const closeAlarmConfirmModal = () => {
    setOpenAlarmConfirm(false);
  };

  const handleTurnOffAlarm = () => {
    turnOffAudioAlarm();
    closeAlarmConfirmModal();
  };

  const [time_left, { startCountdown }] = useCountdown({
    countStart: countStartRef.current,
    countStop: 0,
  });

  useEffect(() => {
    console.log({ seconds: converToCountStart(audio_alarm) });
    countStartRef.current = converToCountStart(audio_alarm);
    startCountdown();
  }, [audio_alarm]);

  useEffect(() => {
    if (time_left === 0) {
      turnOffAudioAlarm();
      console.log({ is_audio_playing });
      if (is_audio_playing) {
        openConfirmModal();
      }
    }
  }, [time_left, is_audio_playing]);

  return (
    <div onClick={disableClickEvent}>
      <ConfirmDialog
        desc='B???n c?? ch???c ch???n mu???n x??a h???n gi????'
        title='X??a H???n Gi???'
        open={openAlarmConfirm}
        onCancel={closeAlarmConfirmModal}
        onOk={handleTurnOffAlarm}
      />
      <Container open_lyric={open_lyric}>
        <span>
          Nh???c s??? d???ng sau:{' '}
          <strong>{formatSongDuration(time_left, true)}</strong>
        </span>
        <IoMdClose onClick={openAlarmConfirmModal} />
      </Container>
    </div>
  );
};

export default AudioAlarm;
