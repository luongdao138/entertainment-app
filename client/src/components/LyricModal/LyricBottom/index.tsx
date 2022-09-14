import React from "react";
import { LyricContentTab } from "../../../layout/components/LyricModal";
import { getAudioCurrentSongSelector } from "../../../redux/audioPlayer/audioPlayerSelectors";
import { useAppSelector } from "../../../redux/hooks";
import { Container } from "./style";

interface Props {
  tab: LyricContentTab;
}

const LyricBottom: React.FC<Props> = ({ tab }) => {
  const current_song = useAppSelector(getAudioCurrentSongSelector);

  if (!current_song) return null;

  return (
    <Container>
      {tab === "playlist" ? null : (
        <>
          {current_song.name} - <span> {current_song.singer_name}</span>
        </>
      )}
    </Container>
  );
};

export default LyricBottom;
