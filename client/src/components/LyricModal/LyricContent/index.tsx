import React, { useMemo } from "react";
import { LyricContentTab } from "../../../layout/components/LyricModal";
import SongKaraoke from "./SongKaraoke";
import SongLyric from "./SongLyric";
import SongPlaylist from "./SongPlaylist";
import { Container } from "./style";

interface Props {
  tab: LyricContentTab;
}

const LyricContent: React.FC<Props> = ({ tab }) => {
  const renderContent = useMemo(() => {
    switch (tab) {
      case "lyric":
        return <SongLyric />;
      case "karaoke":
        return <SongKaraoke />;

      default:
        return <SongPlaylist />;
    }
  }, [tab]);

  return <Container>{renderContent}</Container>;
};

export default LyricContent;
