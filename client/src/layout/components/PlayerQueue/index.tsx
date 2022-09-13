import React, { useMemo, useState } from "react";
import { ClickAwayListener } from "@mui/material";
import QueueContent from "../../../components/PlayerQueue/QueueContent";
import PlayerQueueHeader from "../../../components/PlayerQueue/QueueHeader";
import { useAudioContext } from "../../../context/AudioContext";
import { getAudioCurrentSongSelector } from "../../../redux/audioPlayer/audioPlayerSelectors";
import { useAppSelector } from "../../../redux/hooks";
import { Container, NoPlayerContainer } from "./style";
import { useLyricContext } from "../../../context/LyricContext";
import QueueSongItemSkeleton from "../../../components/Skeleton/QueueSongItem";
import { BsFillPlayFill } from "react-icons/bs";

export type PlayerQueueTab = "player" | "recent";

const PlayerQueue = () => {
  const [tab, setTab] = useState<PlayerQueueTab>("player");
  const { openQueue, playerRef, handleCloseQueue } = useAudioContext();
  const { open_lyric } = useLyricContext();

  const is_open_queue = openQueue && !open_lyric;
  const current_song = useAppSelector(getAudioCurrentSongSelector);

  const handleClickAwayPlayerQueue = (e: MouseEvent | TouchEvent) => {
    if (!playerRef.current?.contains(e.target as Node | null)) {
      // handleCloseQueue();
    }
  };

  const changeTab = (tab: PlayerQueueTab) => {
    setTab(tab);
  };

  const NoPlayerQueueContent = useMemo(() => {
    return (
      <NoPlayerContainer>
        <div className="skeleton-container">
          {[...new Array(5)].map((_, index) => (
            <QueueSongItemSkeleton key={index} />
          ))}
        </div>

        <div className="bottom">
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
    if (tab === "recent") return <>Recent</>;
    else {
      if (Boolean(current_song)) return <QueueContent />;
      else return NoPlayerQueueContent;
    }
  }, [tab, current_song]);

  return (
    <ClickAwayListener onClickAway={handleClickAwayPlayerQueue}>
      <Container openPlayer={Boolean(current_song)} openQueue={is_open_queue}>
        <div className="queue-header">
          <PlayerQueueHeader tab={tab} changeTab={changeTab} />
        </div>
        <div className="queue-content">{renderContent}</div>
      </Container>
    </ClickAwayListener>
  );
};

export default PlayerQueue;
