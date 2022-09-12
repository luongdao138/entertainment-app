import React, { useState } from 'react';
import { hourOptions, minuteOptions } from '../../../../constants/options';
import { convertTimeToNumber } from '../../../../utils/formatTime';
import AlarmInput from '../AlarmInput';
import { Container } from './style';
import moment from 'moment';
import { useAudioContext } from '../../../../context/AudioContext';
import { toast } from 'react-toastify';

interface Props {
  closeAlarmModal: () => void;
}

const QueueAlarm: React.FC<Props> = ({ closeAlarmModal }) => {
  const [hour, setHour] = useState<string>('00');
  const [minute, setMinute] = useState<string>('00');
  const { audio_alarm, turnOffAudioAlarm, turnOnAudioAlarm } =
    useAudioContext();

  const is_turn_on = Boolean(audio_alarm);

  const onChangeMinute = (value: string) => {
    setMinute(value);
  };

  const onChangeHour = (value: string) => {
    setHour(value);
  };

  const handleSaveAlarm = () => {
    if (!is_turn_on) {
      const time = new Date().getTime();
      const new_time =
        time + formattedHour * 60 * 60 * 1000 + formattedMinute * 60 * 1000;
      console.log({ minute, hour, new_time });
      turnOnAudioAlarm(new_time);
      toast.success('Hẹn giờ dừng phát nhạc thành công');
      closeAlarmModal();
    }
  };

  const formattedHour = convertTimeToNumber(hour);
  const formattedMinute = convertTimeToNumber(minute);
  const has_time = formattedHour || formattedMinute;

  const getNewTime = () => {
    const time = new Date().getTime();
    const new_time =
      time + formattedHour * 60 * 60 * 1000 + formattedMinute * 60 * 1000;

    return moment(new Date(new_time)).format('hh:mm DD/MM/YYYY');
  };

  return (
    <Container>
      <h3 className='title'>Hẹn giờ dừng phát nhạc</h3>
      <div className='alarm-content'>
        <AlarmInput
          value={hour}
          onChange={onChangeHour}
          options={hourOptions}
          label='giờ'
        />
        <div className='dot'>:</div>
        <AlarmInput
          options={minuteOptions}
          label='phút'
          value={minute}
          onChange={onChangeMinute}
          maxValue={59}
        />
      </div>
      <p className='desc'>
        {has_time ? (
          <>
            Dự tính phát nhạc vào lúc <span>{getNewTime()}</span>
          </>
        ) : (
          'Chọn thời gian để dừng phát nhạc'
        )}
      </p>
      <button
        disabled={!has_time}
        className='btn save-btn'
        onClick={handleSaveAlarm}
      >
        Lưu lại
      </button>
      <button className='btn cancel-btn' onClick={closeAlarmModal}>
        Hủy
      </button>
    </Container>
  );
};

export default QueueAlarm;
