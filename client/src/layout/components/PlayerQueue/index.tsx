import React, { useMemo, useState, useEffect } from 'react';
import { ClickAwayListener } from '@mui/material';
import QueueContent from '../../../components/PlayerQueue/QueueContent';
import PlayerQueueHeader from '../../../components/PlayerQueue/QueueHeader';
import { useAudioContext } from '../../../context/AudioContext';
import { getAudioCurrentSongSelector } from '../../../redux/audioPlayer/audioPlayerSelectors';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { Container, NoPlayerContainer } from './style';
import { useLyricContext } from '../../../context/LyricContext';
import QueueSongItemSkeleton from '../../../components/Skeleton/QueueSongItem';
import { BsFillPlayFill } from 'react-icons/bs';
import HistorySong from '../../../components/PlayerQueue/HistorySongs';
import { resetHistorySongs } from '../../../redux/song/songSlice';
import { getHistorySongsAction } from '../../../redux/song/songActions';
import { getUserHistorySongsPaginationSelector } from '../../../redux/song/songSelectors';
import { clearMetaData } from '../../../redux/metadata/actions';

export type PlayerQueueTab = 'player' | 'recent';

const PlayerQueue = () => {
  const [tab, setTab] = useState<PlayerQueueTab>('player');
  const { openQueue, openPlayer, playerRef, handleCloseQueue } =
    useAudioContext();
  const { limit, page } = useAppSelector(getUserHistorySongsPaginationSelector);
  const dispatch = useAppDispatch();
  const { open_lyric } = useLyricContext();

  const is_open_queue = openPlayer && openQueue;
  const current_song = useAppSelector(getAudioCurrentSongSelector);

  const handleClickAwayPlayerQueue = (e: MouseEvent | TouchEvent) => {
    if (!playerRef.current?.contains(e.target as Node | null)) {
      // handleCloseQueue();
    }
  };

  const changeTab = (tab: PlayerQueueTab) => {
    setTab(tab);
  };

  useEffect(() => {
    if (open_lyric) {
      handleCloseQueue();
    }
  }, [open_lyric]);

  useEffect(() => {
    changeTab('player');
    if (!current_song) {
      dispatch(resetHistorySongs());
    }
  }, [current_song]);

  useEffect(() => {
    if (tab === 'recent') {
      dispatch(getHistorySongsAction({ page, limit }));
    }

    return () => {
      dispatch(resetHistorySongs());
    };
  }, [tab]);

  const NoPlayerQueueContent = useMemo(() => {
    return (
      <NoPlayerContainer>
        <div className='skeleton-container'>
          {[...new Array(5)].map((_, index) => (
            <QueueSongItemSkeleton key={index} />
          ))}
        </div>

        <div className='bottom'>
          <p>Khám phá thêm các bài hát mới của Zing MP3</p>
          <button>
            <BsFillPlayFill />
            <span>Phát nhạc mới phát hành</span>
          </button>
        </div>
      </NoPlayerContainer>
    );
  }, []);

  const renderContent = useMemo(() => {
    if (tab === 'recent')
      return <HistorySong changeToPlayerTab={() => changeTab('player')} />;
    else {
      if (Boolean(current_song)) return <QueueContent />;
      else return NoPlayerQueueContent;
    }
  }, [tab, current_song]);

  return (
    <ClickAwayListener onClickAway={handleClickAwayPlayerQueue}>
      <Container openPlayer={Boolean(current_song)} openQueue={is_open_queue}>
        <div className='queue-header'>
          <PlayerQueueHeader tab={tab} changeTab={changeTab} />
        </div>
        <div className='queue-content' id='player-queue-history-songs'>
          {renderContent}
        </div>
      </Container>
    </ClickAwayListener>
  );
};

export default PlayerQueue;
