import { Switch } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineRefresh } from 'react-icons/hi';
import QueueSongItem from './QueueSongItem';
import { Container } from './style';
import { useAppSelector } from '../../../redux/hooks';
import {
  getAudioArchivedListSelector,
  getAudioCurrentPlaylistSelector,
  getAudioCurrentSongSelector,
  getAudioNextListSelector,
  getAudioRecommendListSelector,
  getAudioStateSelector,
} from '../../../redux/audioPlayer/audioPlayerSelectors';
import { v4 as uuid } from 'uuid';
import { useAudioContext } from '../../../context/AudioContext';

const QueueContent = () => {
  const current_song = useAppSelector(getAudioCurrentSongSelector);
  const archived_list = useAppSelector(getAudioArchivedListSelector);
  const recommended_list = useAppSelector(getAudioRecommendListSelector);
  const next_list = useAppSelector(getAudioNextListSelector);
  const current_playlist = useAppSelector(getAudioCurrentPlaylistSelector);
  const audio_state = useAppSelector(getAudioStateSelector);

  const { handleRemoveSongsOutOfPlayQueue, handleChangeAutoPlayRecommend } =
    useAudioContext();

  return (
    <Container>
      <div className='archive-list'>
        {archived_list.map((song) => (
          <QueueSongItem
            can_remove_out_of_queue
            onRemoveSongOutOfQueue={handleRemoveSongsOutOfPlayQueue}
            key={uuid()}
            song={song}
          />
        ))}
      </div>

      {next_list.length > 0 && (
        <div className='next-list'>
          <div className='next-list-header'>
            <h3>Tiếp theo</h3>
            {current_playlist && (
              <p>
                Từ playlist
                <Link to={`/playlist/${current_playlist.id}`}>
                  {current_playlist.title}
                </Link>
              </p>
            )}
          </div>

          <div className='songs-list'>
            {next_list.map((song) => (
              <QueueSongItem
                can_remove_out_of_queue
                onRemoveSongOutOfQueue={handleRemoveSongsOutOfPlayQueue}
                key={uuid()}
                song={song}
              />
            ))}
          </div>
        </div>
      )}
      {recommended_list.length > 0 && (
        <div className='recommend-list'>
          <div className='recommend-list-header'>
            <h3>{next_list.length === 0 ? 'Tiếp theo từ Gợi ý' : 'Gợi ý'}</h3>
            <div className='right'>
              <span>Tự động phát</span>
              <Switch
                inputProps={{ 'aria-label': 'controlled' }}
                sx={{
                  '& .MuiSwitch-thumb': {
                    backgroundColor: '#fff',
                  },
                  '& .MuiSwitch-track ': {
                    backgroundColor: '#a0a0a0',
                  },
                  '& .Mui-checked + .MuiSwitch-track ': {
                    backgroundColor: '#7200a1 !important',
                  },
                }}
                checked={audio_state.is_autoplay_recommend}
                onChange={(e) => {
                  handleChangeAutoPlayRecommend(e.target.checked);
                }}
              />

              <button className='reload-btn'>
                <HiOutlineRefresh />
              </button>
            </div>
          </div>
          {recommended_list.map((song) => (
            <QueueSongItem key={uuid()} song={song} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default QueueContent;
