import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import SongItem from '../../../../components/SongItem';
import { getHistorySongActions } from '../../../../redux/history/historyActions';
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

  const fetchNext = () => {
    if (has_more_songs) {
      dispatch(getHistorySongActions({ page: page + 1, limit }));
    }
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
            onAddSongsToPlayNext={() => {}}
            onAddSongsToPlayerQueue={() => {}}
            song={song}
            is_from_history
            can_play_with_lyric
            key={song.id}
          />
        ))}
      </InfiniteScroll>
    </Container>
  );
};

export default HistorySong;
