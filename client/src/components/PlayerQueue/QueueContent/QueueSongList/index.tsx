import React from 'react';
import { useAudioContext } from '../../../../context/AudioContext';
import { AudioSong } from '../../../../redux/audioPlayer/audioPlayerSlice';
import QueueSongItem from '../QueueSongItem';
import { v4 as uuid } from 'uuid';
import { Draggable, Droppable } from 'react-beautiful-dnd';

interface Props {
  songs: AudioSong[];
  can_drop?: boolean;
  droppable_id?: string;
}

const QueueSongList: React.FC<Props> = ({ songs, can_drop, droppable_id }) => {
  const { handleRemoveSongsOutOfPlayQueue } = useAudioContext();
  if (!can_drop) {
    return (
      <>
        {songs.map((song) => (
          <QueueSongItem
            can_remove_out_of_queue
            onRemoveSongOutOfQueue={handleRemoveSongsOutOfPlayQueue}
            key={uuid()}
            song={song}
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
                    >
                      <QueueSongItem
                        can_remove_out_of_queue
                        onRemoveSongOutOfQueue={handleRemoveSongsOutOfPlayQueue}
                        key={uuid()}
                        song={song}
                        is_dragging={isDragging}
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
