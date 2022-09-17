import React from 'react';
import { useAudioContext } from '../../../../context/AudioContext';
import { AudioSong } from '../../../../redux/audioPlayer/audioPlayerSlice';
import QueueSongItem from '../../QueueSongItem';
import { v4 as uuid } from 'uuid';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Song } from '../../../../services/song';
import { useAppSelector } from '../../../../redux/hooks';
import { getAudioMetaSelector } from '../../../../redux/audioPlayer/audioPlayerSelectors';

interface Props {
  songs: AudioSong[];
  can_drop?: boolean;
  droppable_id?: string;
}

const QueueSongList: React.FC<Props> = ({ songs, can_drop, droppable_id }) => {
  const { handleRemoveSongsOutOfPlayQueue, handleClickQueueSong } =
    useAudioContext();
  const { is_audio_loading } = useAppSelector(getAudioMetaSelector);

  const onClickQueueSong = (song: Song) => {
    if (song.queue_id && !is_audio_loading) {
      handleClickQueueSong(song.queue_id);
    }
  };

  if (!can_drop) {
    return (
      <>
        {songs.map((song) => (
          <QueueSongItem
            can_remove_out_of_queue
            onRemoveSongOutOfQueue={handleRemoveSongsOutOfPlayQueue}
            key={uuid()}
            song={song}
            onClickQueueSong={onClickQueueSong}
            disable_add_to_play_next
            disable_add_to_player_queue
          />
        ))}
      </>
    );
  }

  return (
    <>
      <div>
        <Droppable key={droppable_id} droppableId={droppable_id || ''}>
          {({ droppableProps, innerRef, placeholder }) => (
            <div ref={innerRef} {...droppableProps}>
              {songs.map((song, index) => (
                <Draggable
                  key={song.queue_id || ''}
                  draggableId={song.queue_id || ''}
                  index={index}
                >
                  {(
                    { draggableProps, innerRef, dragHandleProps },
                    { isDragging }
                  ) => (
                    <div
                      ref={innerRef}
                      {...draggableProps}
                      {...dragHandleProps}
                      style={{ ...draggableProps.style, cursor: 'default' }}
                    >
                      <QueueSongItem
                        can_remove_out_of_queue
                        onRemoveSongOutOfQueue={handleRemoveSongsOutOfPlayQueue}
                        key={uuid()}
                        song={song}
                        is_dragging={isDragging}
                        onClickQueueSong={onClickQueueSong}
                        disable_add_to_play_next
                        disable_add_to_player_queue
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
};

export default QueueSongList;
