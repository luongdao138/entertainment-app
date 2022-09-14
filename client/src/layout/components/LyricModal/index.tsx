import React, { useEffect, useState } from "react";
import LyricBottom from "../../../components/LyricModal/LyricBottom";
import LyricContent from "../../../components/LyricModal/LyricContent";
import LyricHeader from "../../../components/LyricModal/LyricHeader";
import { useLyricContext } from "../../../context/LyricContext";
import useLockScreen from "../../../hooks/useLockScreen";
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

  const changeLyricTab = (tab: LyricContentTab) => {
    setTab(tab);
  };

  useEffect(() => {
    setLocked(open_lyric);
  }, [open_lyric]);

  return (
    <Container open_lyric={open_lyric}>
      <div className="background-container">
        <div
          className="blur-image"
          style={{
            backgroundImage:
              "url(https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/avatars/3/9/5/8/395804d8c74165e61c54d8d42343402e.jpg",
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
