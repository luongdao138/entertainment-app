import { Switch } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineRefresh } from 'react-icons/hi';
import { Container } from './style';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  getAudioArchivedListSelector,
  getAudioCurrentListSongs,
  getAudioCurrentPlaylistSelector,
  getAudioCurrentSongSelector,
  getAudioNextListSelector,
  getAudioRecommendListSelector,
  getAudioStateSelector,
} from '../../../redux/audioPlayer/audioPlayerSelectors';
import { useAudioContext } from '../../../context/AudioContext';
import QueueSongList from './QueueSongList';
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';
import {
  changeAudioArchivedList,
  changeAudioNextList,
} from '../../../redux/audioPlayer/audioPlayerSlice';
import _ from 'lodash';

const QueueContent = () => {
  const archived_list = useAppSelector(getAudioArchivedListSelector);
  const recommended_list = useAppSelector(getAudioRecommendListSelector);
  const next_list = useAppSelector(getAudioNextListSelector);
  const current_playlist = useAppSelector(getAudioCurrentPlaylistSelector);
  const audio_state = useAppSelector(getAudioStateSelector);
  const audio_list_songs = useAppSelector(getAudioCurrentListSongs);
  const current_song = useAppSelector(getAudioCurrentSongSelector);

  const dispatch = useAppDispatch();

  const { handleChangeAutoPlayRecommend } = useAudioContext();
  const is_playlist_playing =
    !_.isNil(current_playlist) &&
    next_list.some((s) => s.queue_playlist_id === current_playlist.id);
  // && next_list.some((s) => current_playlist_songs.some((_s) => _s.id === s.id));

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { draggableId, destination, source } = result;

    if (!destination) return;

    const { index: dest_index, droppableId: dest_droppable_id } = destination;
    const { index: source_index, droppableId: source_droppable_id } = source;

    const is_current_audio = audio_list_songs.some(
      (s) => s.queue_id === draggableId && s.is_current_audio
    );
    console.log(
      `drag and drop from ${source_droppable_id} to ${dest_droppable_id}, with source index: ${source_index} and dest index: ${dest_index}, is current audio: ${is_current_audio}`
    );
    let new_archive_list = [...archived_list];
    let new_next_list = [...next_list];

    if (dest_droppable_id === source_droppable_id) {
      // trong cùng 1 list
      if (source_droppable_id === 'archive') {
        // drag and drop trong list archive
        if (dest_index === archived_list.length - 1) {
          // trường hợp drop vào vị trí cuối cùng của list archive => ko làm gì cả
          return;
        }

        if (!is_current_audio) {
          console.log('Drag and drop in archive list and is not current audio');
          const [removed] = new_archive_list.splice(source_index, 1);
          new_archive_list.splice(dest_index, 0, removed);
          dispatch(changeAudioArchivedList({ list: new_archive_list }));
        } else {
          console.log('Drag and drop in archive list and is current audio');
          const top = archived_list.slice(0, dest_index);
          const bottom = archived_list.slice(dest_index, source_index);
          const [removed] = new_archive_list.splice(source_index, 1);

          dispatch(changeAudioArchivedList({ list: [...top, removed] }));
          dispatch(changeAudioNextList({ list: [...bottom, ...next_list] }));
        }
      } else {
        // drag và drop trong list next
        const [removed] = new_next_list.splice(source_index, 1);
        new_next_list.splice(dest_index, 0, removed);
        dispatch(changeAudioNextList({ list: new_next_list }));
      }
    } else {
      // khác list
      if (source_droppable_id === 'next' && dest_droppable_id === 'archive') {
        if (dest_index === archived_list.length) return;
        const [removed] = new_next_list.splice(source_index, 1);
        new_archive_list.splice(dest_index, 0, removed);

        dispatch(changeAudioArchivedList({ list: new_archive_list }));
        dispatch(changeAudioNextList({ list: new_next_list }));
        return;
      }

      if (source_droppable_id === 'archive' && dest_droppable_id === 'next') {
        if (!is_current_audio) {
          const [removed] = new_archive_list.splice(source_index, 1);
          new_next_list.splice(dest_index, 0, removed);

          dispatch(changeAudioArchivedList({ list: new_archive_list }));
          dispatch(changeAudioNextList({ list: new_next_list }));
        } else {
          // trường hợp này người dùng drag và drop bài đang phát vào list next
          if (dest_index === 0) {
            return;
          }
          const top = next_list.slice(0, dest_index);
          const bottom = next_list.slice(dest_index);

          dispatch(
            changeAudioArchivedList({
              list: [
                ...archived_list.slice(0, archived_list.length - 1),
                ...top,
                archived_list[archived_list.length - 1],
              ],
            })
          );
          dispatch(changeAudioNextList({ list: bottom }));
        }
        return;
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <div className='archive-list'>
          <QueueSongList
            can_drop
            droppable_id='archive'
            songs={archived_list}
          />
        </div>

        {next_list.length > 0 && (
          <div className='next-list'>
            <div className='next-list-header'>
              <h3>Tiếp theo</h3>
              {is_playlist_playing && (
                <p>
                  Từ playlist{' '}
                  <Link to={`/playlist/${current_playlist.id}`}>
                    {current_playlist.title}
                  </Link>
                </p>
              )}
            </div>

            <div className='songs-list'>
              <QueueSongList can_drop droppable_id='next' songs={next_list} />
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
            <QueueSongList songs={recommended_list} />
          </div>
        )}
      </Container>
    </DragDropContext>
  );
};

export default QueueContent;
