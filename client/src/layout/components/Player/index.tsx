import React, { useEffect, useState } from 'react';
import { MdOutlineQueueMusic } from 'react-icons/md';
import AudioAction from '../../../components/AudioPlayer/AudioAction';
import AudioSeekbar from '../../../components/AudioPlayer/AudioSeekbar';
import AudioSong from '../../../components/AudioPlayer/AudioSong';
import AudioVolume from '../../../components/AudioPlayer/AudioVolume';
import { Container } from './style';
import AudioPlayer from '../../../components/AudioPlayer';
import { useAudioContext } from '../../../context/AudioContext';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';
import {
  getAudioCurrentSongSelector,
  getAudioMetaSelector,
} from '../../../redux/audioPlayer/audioPlayerSelectors';
import AudioPlaybackRate from '../../../components/AudioPlayer/AudioPlaybackRate';
import AudioLyric from '../../../components/AudioPlayer/AudioLyric';
import AudioAlarm from '../../../components/AudioAlarm';
import Modal from '../../../components/Modal';
import ContinueSongConfirm from '../../../components/ContinueSongConfirm';
import { useLyricContext } from '../../../context/LyricContext';
import MyTooltip from '../../../components/Tooltip';

const Player = () => {
  const {
    handleToggleQueue,
    openQueue,
    audio_alarm,
    playerRef,
    handlePauseAudio,
    handlePlayAudio,
    handleToggleAudioPlayState,
    turnOffAudioAlarm,
  } = useAudioContext();
  const [openContinueSongConfirm, setOpenContinueSongConfirm] =
    useState<boolean>(false);

  const navigate = useNavigate();
  const { is_audio_playing } = useAppSelector(getAudioMetaSelector);
  const current_song = useAppSelector(getAudioCurrentSongSelector);
  const { open_lyric } = useLyricContext();

  const open_player = Boolean(current_song);
  const open_audio_alarm = Boolean(audio_alarm);

  const toggleQueue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleToggleQueue?.();
  };

  const handleClickPlayer = () => {
    if (current_song) navigate(`/song/${current_song.id}`);
  };

  const handleEndAlarm = () => {
    handlePauseAudio();
    setOpenContinueSongConfirm(true);
  };

  useEffect(() => {
    if (open_player) {
      const handleClickBackspace = (e: KeyboardEvent) => {
        if (
          (e.target as any)?.nodeName === 'INPUT' ||
          (e.target as any)?.nodeName === 'TEXTAREA'
        ) {
          return;
        }
        if (e.code === 'Space') {
          e.preventDefault();
          handleToggleAudioPlayState();
        }
      };
      addEventListener('keydown', handleClickBackspace);

      return () => {
        removeEventListener('keydown', handleClickBackspace);
      };
    }
  }, [open_player, is_audio_playing]);

  useEffect(() => {
    return () => {
      localStorage.removeItem('music_app_current_time');
      turnOffAudioAlarm();
    };
  }, []);

  return (
    <Container
      openQueue={openQueue}
      open_lyric={open_lyric}
      ref={playerRef}
      onClick={handleClickPlayer}
    >
      {/* Modal xu???t hi???n khi h???t th???i gian h???n gi??? */}
      {/* ????? confirm xem ng?????i d??ng c?? mu???n nghe nh???c ti???p hay kh??ng */}
      <Modal
        maxWidth='xs'
        open={openContinueSongConfirm}
        onClose={() => setOpenContinueSongConfirm(false)}
        PaperProps={{
          sx: { maxWidth: '330px', backgroundColor: 'transparent' },
        }}
      >
        <ContinueSongConfirm
          onCloseConfirmModal={() => setOpenContinueSongConfirm(false)}
          onContinuePlay={handlePlayAudio}
        />
      </Modal>

      {/* Th??ng b??o th???i gian c??n l???i khi c?? h???n gi??? ph??t nh???c */}
      {open_audio_alarm && (
        <AudioAlarm
          openConfirmModal={handleEndAlarm}
          audio_alarm={audio_alarm as number}
        />
      )}

      <div className='player-content'>
        <div className='player-left'>
          <AudioSong />
        </div>
        <div className='player-middle'>
          <AudioAction />
          <AudioSeekbar />
          <AudioPlayer />
        </div>
        <div className='player-right'>
          <AudioLyric />
          <AudioPlaybackRate />
          <AudioVolume />
          <div className='divider'></div>
          <div className='queue'>
            <MyTooltip title='Danh s??ch ph??t'>
              <button onClick={toggleQueue}>
                <MdOutlineQueueMusic />
              </button>
            </MyTooltip>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Player;
