import React from 'react';
import {
  BsFillPlayFill,
  BsPauseFill,
  BsShuffle,
  BsFillSkipEndFill,
  BsFillSkipStartFill,
} from 'react-icons/bs';
import { FiRepeat } from 'react-icons/fi';
import { TbRepeatOnce } from 'react-icons/tb';
import {
  getAudioArchivedListSelector,
  getAudioMetaSelector,
  getAudioStateSelector,
} from '../../../redux/audioPlayer/audioPlayerSelectors';
import { changeAudioCurrentState } from '../../../redux/audioPlayer/audioPlayerSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { ActionItemButton, Container } from './style';
import { RotatingLines } from 'react-loader-spinner';
import { disableClickEvent } from '../../../utils/common';
import { useAudioContext } from '../../../context/AudioContext';
import { ReplayMode } from '../../../constants/options';
import MyTooltip from '../../Tooltip';

const AudioAction = () => {
  const dispatch = useAppDispatch();
  const audio_state = useAppSelector(getAudioStateSelector);
  const audio_meta = useAppSelector(getAudioMetaSelector);
  const archive_list = useAppSelector(getAudioArchivedListSelector);
  const {
    handlePlayAudio,
    handlePauseAudio,
    handleMoveToNextSong,
    handleMoveToPrevSong,
  } = useAudioContext();

  // check xem bài hát đang phát có phải là bài hát đầu tiên hay ko, nếu có thì disable nút back
  const is_first_song = archive_list[0]?.is_current_audio;

  const handleClickShuffle = (e: React.MouseEvent<HTMLElement>) => {
    disableClickEvent(e);
    dispatch(
      changeAudioCurrentState({
        new_state: { is_shuffle: !audio_state.is_shuffle },
      })
    );
  };

  const getReplaceIcon = (() => {
    switch (audio_state.replay_mode) {
      case ReplayMode.NONE:
        return <FiRepeat />;

      case ReplayMode.ALL:
        return <FiRepeat />;

      case ReplayMode.ONE:
        return <TbRepeatOnce />;

      default:
        return <></>;
    }
  })();

  const handleClickPlayButton = (e: React.MouseEvent<HTMLElement>) => {
    disableClickEvent(e);
    if (audio_meta.is_audio_loading) return;

    if (audio_meta.is_audio_playing) {
      handlePauseAudio();
    } else {
      handlePlayAudio();
    }
  };

  const handleClickNextSong = (e: React.MouseEvent<HTMLElement>) => {
    disableClickEvent(e);
    handleMoveToNextSong();
  };

  const handleClickPrevSong = (e: React.MouseEvent<HTMLElement>) => {
    disableClickEvent(e);
    handleMoveToPrevSong();
  };

  const handleChangeReplaceMode = (e: React.MouseEvent<HTMLElement>) => {
    disableClickEvent(e);
    let new_play_mode: ReplayMode = ReplayMode.NONE;
    if (audio_state.replay_mode === ReplayMode.NONE)
      new_play_mode = ReplayMode.ALL;
    if (audio_state.replay_mode === ReplayMode.ALL)
      new_play_mode = ReplayMode.ONE;

    dispatch(
      changeAudioCurrentState({ new_state: { replay_mode: new_play_mode } })
    );
  };

  return (
    <Container>
      {/* Shuffle songs */}
      <MyTooltip
        placement='top'
        title={
          audio_state.is_shuffle ? 'Tắt phát ngẫu nhiên' : 'Bật phát ngẫu nhiên'
        }
      >
        <ActionItemButton
          active={audio_state.is_shuffle}
          className='action-item'
          onClick={handleClickShuffle}
        >
          <BsShuffle />
        </ActionItemButton>
      </MyTooltip>

      {/* Go to previous song in queue */}
      <ActionItemButton
        className='action-item'
        onClick={handleClickPrevSong}
        disabled={audio_meta.is_audio_error || is_first_song}
      >
        <BsFillSkipStartFill className='big-icon' />
      </ActionItemButton>

      {/* Play or pause song */}
      <button
        disabled={audio_meta.is_audio_error}
        className='play-state'
        onClick={handleClickPlayButton}
      >
        {audio_meta.is_audio_loading ? (
          <RotatingLines
            strokeColor='#ffffff'
            strokeWidth='5'
            animationDuration='0.75'
            width='15'
            visible={true}
          />
        ) : audio_meta.is_audio_playing ? (
          <BsPauseFill />
        ) : (
          <BsFillPlayFill className='icon' />
        )}
        {/* <BsPauseFill /> */}
        {/* <BsFillPlayFill /> */}
      </button>

      {/* Goto next song in playlist queue */}
      <ActionItemButton
        onClick={handleClickNextSong}
        className='action-item'
        disabled={audio_meta.is_audio_error}
      >
        <BsFillSkipEndFill className='big-icon' />
      </ActionItemButton>

      {/* Replay all */}
      <MyTooltip
        placement='top'
        title={
          audio_state.replay_mode === ReplayMode.NONE
            ? 'Bật phát lại tất cả'
            : audio_state.replay_mode === ReplayMode.ALL
            ? 'Bật phát lại một bài'
            : 'Tắt phát lại'
        }
      >
        <ActionItemButton
          active={audio_state.replay_mode !== ReplayMode.NONE}
          className='action-item'
          onClick={handleChangeReplaceMode}
        >
          {getReplaceIcon}
        </ActionItemButton>
      </MyTooltip>
    </Container>
  );
};

export default AudioAction;
