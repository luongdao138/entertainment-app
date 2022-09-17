import React, { useEffect, useState, useRef } from 'react';
import { Container } from './style';
import { Song } from '../../../services/song';
import QueueSongItem from '../QueueSongItem';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getAudioMetaSelector } from '../../../redux/audioPlayer/audioPlayerSelectors';
import {
  getUserHistorySongsPaginationSelector,
  getUserHistorySongsSelector,
} from '../../../redux/song/songSelectors';
import { getHistorySongsAction } from '../../../redux/song/songActions';
import { createMetaSelector } from '../../../redux/metadata/selectors';
import { clearMetaData } from '../../../redux/metadata/actions';
import { resetHistorySongs } from '../../../redux/song/songSlice';
import QueueSongItemSkeleton from '../../Skeleton/QueueSongItem';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {}

const getHistorySongsMetaSelector = createMetaSelector(getHistorySongsAction);

const HistorySong: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { limit, page, total_count } = useAppSelector(
    getUserHistorySongsPaginationSelector
  );
  const [current_page, setCurrentPage] = useState<number>(page);
  const { is_audio_loading } = useAppSelector(getAudioMetaSelector);
  const songs = useAppSelector(getUserHistorySongsSelector);
  const historySongsMeta = useAppSelector(getHistorySongsMetaSelector);
  const isFirstRenderRef = useRef<boolean>(true);
  const has_more_songs =
    !historySongsMeta.pending && songs.length < total_count;
  console.log({ has_more_songs });

  const onClickQueueSong = (song: Song) => {
    if (!is_audio_loading) {
      console.log({ song });
    }
  };

  const handleGetMoreSongs = () => {
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    // lần đầu render => ko gọi API vì đã gọi bên player queue
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    // gọi API lấy danh sách history songs mỗi lần chuyển sang tab này
    // và mỗi khi page và limit thay đổi
    dispatch(getHistorySongsAction({ limit, page: current_page }));
  }, [current_page, limit]);

  useEffect(() => {
    return () => {
      dispatch(clearMetaData(getHistorySongsAction.typePrefix));
      dispatch(resetHistorySongs());
    };
  }, []);

  return (
    <Container style={{ overflow: 'auto' }}>
      <InfiniteScroll
        dataLength={songs.length}
        hasMore={has_more_songs}
        loader={null}
        next={handleGetMoreSongs}
        scrollableTarget='player-queue-history-songs'
      >
        {songs.map((song) => (
          <QueueSongItem
            key={song.id}
            song={song}
            onClickQueueSong={onClickQueueSong}
            can_play_with_lyric={Boolean(song.lyric?.id)} // chỗ cần cần update lại, chỉ đúng khi bài hát này có lyric
          />
        ))}
      </InfiniteScroll>

      {historySongsMeta.pending && (
        <div className='skeleton-container'>
          {[...new Array(5)].map((_, index) => (
            <QueueSongItemSkeleton key={index} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default HistorySong;
