import React, { useEffect } from "react";
import { useLyricContext } from "../../../context/LyricContext";
import useLockScreen from "../../../hooks/useLockScreen";
import { Container } from "./style";

const LyricModal = () => {
  const { open_lyric } = useLyricContext();
  const [_, setLocked] = useLockScreen();

  useEffect(() => {
    // setLocked(true);
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
    </Container>
  );
};

export default LyricModal;
