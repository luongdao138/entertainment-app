import React, { useEffect, useState } from "react";
import LyricBottom from "../../../components/LyricModal/LyricBottom";
import LyricContent from "../../../components/LyricModal/LyricContent";
import LyricHeader from "../../../components/LyricModal/LyricHeader";
import { useLyricContext } from "../../../context/LyricContext";
import useLockScreen from "../../../hooks/useLockScreen";
import { getAudioCurrentSongSelector } from "../../../redux/audioPlayer/audioPlayerSelectors";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getSongLyricAction } from "../../../redux/lyric/lyricActions";
import { resetLyric } from "../../../redux/lyric/lyricSlice";
import { Container } from "./style";

export type LyricContentTab = "playlist" | "karaoke" | "lyric";

interface Props {
  enterFullscreenMode: () => void;
  exitFullscreenMode: () => void;
  isFullscreenMode: boolean;
}

const LyricModal: React.FC<Props> = ({
  enterFullscreenMode,
  exitFullscreenMode,
  isFullscreenMode,
}) => {
  const { open_lyric } = useLyricContext();
  const [_, setLocked] = useLockScreen();
  const [tab, setTab] = useState<LyricContentTab>("lyric");
  const current_song = useAppSelector(getAudioCurrentSongSelector);
  const dispatch = useAppDispatch();

  const changeLyricTab = (tab: LyricContentTab) => {
    setTab(tab);
  };

  useEffect(() => {
    setLocked(open_lyric);
  }, [open_lyric]);

  useEffect(() => {
    if (current_song?.lyric?.id) {
      dispatch(getSongLyricAction({ song: current_song }));
    } else {
      dispatch(resetLyric());
    }
  }, [current_song]);

  return (
    <Container open_lyric={open_lyric}>
      <div className="background-container">
        <div
          className="blur-image"
          style={{
            backgroundImage: `url(${current_song?.thumbnail})`,
          }}
        ></div>
        <div className="overlay"></div>
      </div>

      <div className="lyric-content">
        <LyricHeader
          enterFullscreenMode={enterFullscreenMode}
          exitFullscreenMode={exitFullscreenMode}
          isFullScreenMode={isFullscreenMode}
          tab={tab}
          changeTab={changeLyricTab}
        />
        <LyricContent tab={tab} />
        <LyricBottom tab={tab} />
      </div>
    </Container>
  );
};

export default LyricModal;
