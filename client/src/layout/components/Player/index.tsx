import React, { useEffect } from 'react';
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
import { getAudioCurrentSongSelector } from '../../../redux/audioPlayer/audioPlayerSelectors';

const Player = () => {
  const { handleToggleQueue, openQueue, playerRef } = useAudioContext();
  const context = useAudioContext();
  const navigate = useNavigate();
  const current_song = useAppSelector(getAudioCurrentSongSelector);

  const toggleQueue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log({ context });
    handleToggleQueue?.();
  };

  const handleClickPlayer = () => {
    if (current_song) navigate(`/song/${current_song.id}`);
  };

  return (
    <Container
      openQueue={openQueue}
      ref={playerRef}
      onClick={handleClickPlayer}
    >
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
          <AudioVolume />
          <div className='divider'></div>
          <div className='queue'>
            <button onClick={toggleQueue}>
              <MdOutlineQueueMusic />
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Player;
