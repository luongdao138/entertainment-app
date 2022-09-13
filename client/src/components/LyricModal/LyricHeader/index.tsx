import React from "react";
import { Container, TabButton } from "./style";
import { ReactComponent as ZingMP3Icon } from "../../../assets/zing-mp3-icon.svg";
import { BsChevronDown } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { CgArrowsExpandRight } from "react-icons/cg";
import { useLyricContext } from "../../../context/LyricContext";

const LyricHeader = () => {
  const { handleCloseLyric } = useLyricContext();

  const onCloseLyric = () => {
    handleCloseLyric();
  };

  return (
    <Container>
      <ZingMP3Icon className="logo" />
      <div className="lyric-header-tabs">
        <TabButton>Danh sách phát</TabButton>
        <TabButton>Karaoke</TabButton>
        <TabButton active>Lời bài hát</TabButton>
      </div>
      <div className="lyric-header-actions">
        <button className="action-btn">
          <CgArrowsExpandRight />
        </button>
        <button className="action-btn">
          <FiSettings />
        </button>
        <button onClick={onCloseLyric} className="action-btn">
          <BsChevronDown />
        </button>
      </div>
    </Container>
  );
};

export default LyricHeader;
