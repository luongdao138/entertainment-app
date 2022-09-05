import React from 'react';
import { MdOutlineQueueMusic } from 'react-icons/md';
import AudioAction from '../../../components/AudioPlayer/AudioAction';
import AudioSeekbar from '../../../components/AudioPlayer/AudioSeekbar';
import AudioSong from '../../../components/AudioPlayer/AudioSong';
import AudioVolume from '../../../components/AudioPlayer/AudioVolume';
import { Container } from './style';
import { v4 as uuid } from 'uuid';
import AudioPlayer from '../../../components/AudioPlayer';
import { useAudioContext } from '../../../context/AudioContext';

const Player = () => {
  const { handleToggleQueue, playerRef } = useAudioContext();

  return (
    <Container ref={playerRef}>
      <div className='player-content'>
        <div className='player-left'>
          <AudioSong
            song={{
              id: uuid(),
              created_at: new Date(),
              duration: 170,
              is_liked: false,
              name: 'Ngân hà và vì sao',
              singer_name: 'Tiểu lam bối tâm',
              thumbnail:
                'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/3/b/5/9/3b5928ebe6a396a280104733e0e71f5c.jpg',
              updated_at: new Date(),
              url: '',
              belong_categories: [],
            }}
          />
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
            <button onClick={handleToggleQueue}>
              <MdOutlineQueueMusic />
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Player;
