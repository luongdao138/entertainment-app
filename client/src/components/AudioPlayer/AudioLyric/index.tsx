import React from "react";
import { Container } from "./style";
import { TbMicrophone2 } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getAudioCurrentSongSelector } from "../../../redux/audioPlayer/audioPlayerSelectors";
import { disableClickEvent } from "../../../utils/common";
import { useLyricContext } from "../../../context/LyricContext";
import MyTooltip from "../../Tooltip";
import { getSongLyricAction } from "../../../redux/lyric/lyricActions";
import { getLyricSongSelector } from "../../../redux/lyric/lyricSelectors";

const AudioLyric = () => {
  const { handleOpenLyric } = useLyricContext();
  const current_song = useAppSelector(getAudioCurrentSongSelector);
  const dispatch = useAppDispatch();
  const song = useAppSelector(getLyricSongSelector);

  if (!current_song) return null;

  const has_lyric = Boolean(current_song.lyric?.id);

  const handleClickLyricBtn = (e: React.MouseEvent<HTMLElement>) => {
    // gọi API để lấy lyric lời bài hát
    if (song?.id !== current_song.id)
      dispatch(getSongLyricAction({ song: current_song }));

    // mở lyric modal
    handleOpenLyric();
  };

  return (
    <Container onClick={disableClickEvent}>
      <MyTooltip
        placement="top"
        disabled={!Boolean(has_lyric)}
        title="Xem lời bài hát"
      >
        <button
          onClick={handleClickLyricBtn}
          className="karaoke-icon"
          disabled={!Boolean(has_lyric)}
        >
          <TbMicrophone2 />
        </button>
      </MyTooltip>
    </Container>
  );
};

export default AudioLyric;
