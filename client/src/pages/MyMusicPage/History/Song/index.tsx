import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import SongItemSkeleton from '../../../../components/Skeleton/SongItem';
import SongItem from '../../../../components/SongItem';
import { useAudioContext } from '../../../../context/AudioContext';
import { AudioSong } from '../../../../redux/audioPlayer/audioPlayerSlice';
import {
  deleteHistorySongAction,
  getHistorySongActions,
} from '../../../../redux/history/historyActions';
import {
  getHistorySongsPaginationSelector,
  getHistorySongsSelector,
} from '../../../../redux/history/historySelectors';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { clearMetaData } from '../../../../redux/metadata/actions';
import { createMetaSelector } from '../../../../redux/metadata/selectors';
import { Container } from './style';

const getHistorySongsMetaSelector = createMetaSelector(getHistorySongActions);

const HistorySong = () => {
  //useEff
  const songs = useAppSelector(getHistorySongsSelector);
  const { limit, page, total_count } = useAppSelector(
    getHistorySongsPaginationSelector
  );
  const historyMeta = useAppSelector(getHistorySongsMetaSelector);
  const has_more_songs = !historyMeta.pending && songs.length < total_count;
  const dispatch = useAppDispatch();
  const {
    handleAddSongToPlayNext,
    handleAddSongsToPlayerQueue,
    handleClickSongAudio,
  } = useAudioContext();

  const fetchNext = () => {
    if (has_more_songs) {
      dispatch(getHistorySongActions({ page: page + 1, limit }));
    }
  };

  const onAddSongToPlayerQueue = (song: AudioSong) => {
    handleAddSongsToPlayerQueue({
      playlist: null,
      songs: [song],
      queue_playlist_id: undefined,
    });
  };
  const onAddSongToPlayNext = (song: AudioSong) => {
    handleAddSongToPlayNext({
      song,
      queue_playlist_id: undefined,
    });
  };

  const onClickSongAudio = (song: AudioSong) => {
    handleClickSongAudio({
      playlist: null,
      list_songs: [song],
      song,
      is_from_recommend: true,
      disabled_history: true,
    });
  };

  const handleDeleteHistorySong = (song_id: string) => {
    dispatch(deleteHistorySongAction({ song_id }));
  };

  useEffect(() => {
    return () => {
      dispatch(clearMetaData(getHistorySongActions.typePrefix));
    };
  }, []);

  return (
    <Container>
      <InfiniteScroll
        dataLength={songs.length}
        loader={null}
        hasMore={has_more_songs}
        next={fetchNext}
      >
        {songs.map((song) => (
          <SongItem
            onAddSongsToPlayNext={onAddSongToPlayerQueue}
            onAddSongsToPlayerQueue={onAddSongToPlayNext}
            onClickSongAudio={onClickSongAudio}
            song={song}
            is_from_history
            can_play_with_lyric
            key={song.id}
            deleteHistorySong={handleDeleteHistorySong}
          />
        ))}

        {historyMeta.pending && (
          <div className='skeleton-container'>
            {[...new Array(8)].map((_, index) => (
              <SongItemSkeleton key={index} />
            ))}
          </div>
        )}
      </InfiniteScroll>
    </Container>
  );
};

export default HistorySong;
