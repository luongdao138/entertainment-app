import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAudioContext } from "../../../../context/AudioContext";
import { useLyricContext } from "../../../../context/LyricContext";
import {
  getAudioCurrentSongSelector,
  getAudioMetaSelector,
} from "../../../../redux/audioPlayer/audioPlayerSelectors";
import { useAppSelector } from "../../../../redux/hooks";
import { getLyricSongDataSelector } from "../../../../redux/lyric/lyricSelectors";
import { convertLyric } from "../../../../utils/convertLyric";
import AudioPlayingIcon from "../../../AudioPlayingIcon";
import { Container, Content, LyricItem } from "./style";

export interface OutputSentence {
  start_time: number;
  end_time: number;
  data: string;
  id: string;
  status: "new" | "current" | "archived";
  ref: React.RefObject<HTMLLIElement>;
}

const SongLyric = () => {
  const listRef = useRef<HTMLDivElement>(null);
  // const song = useAppSelector(getLyricSongSelector);
  const lyric = useAppSelector(getLyricSongDataSelector);
  const activeSentenceIndexRef = useRef<number>(-1);
  const positionRef = useRef<number>(0);
  const canAutoScrollRef = useRef<boolean>(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { audioRef } = useAudioContext();
  const { open_lyric } = useLyricContext();
  const { is_audio_playing } = useAppSelector(getAudioMetaSelector);
  const [rendered_sentences, setRenderedSentences] = useState<OutputSentence[]>(
    []
  );
  const current_song = useAppSelector(getAudioCurrentSongSelector);

  const has_lyric = lyric?.status === 1 && Boolean(current_song);

  const lyric_sentences = useMemo(() => {
    return lyric ? convertLyric(lyric) : [];
  }, [lyric]);

  useEffect(() => {
    setRenderedSentences(lyric_sentences);
  }, [lyric_sentences]);

  useEffect(() => {
    const active_index = rendered_sentences.findIndex(
      (s) => s.status === "current"
    );

    activeSentenceIndexRef.current = active_index;

    const item_heights = rendered_sentences.map(
      (s) => s.ref.current?.offsetHeight ?? 0
    );
    const list_height = listRef.current?.clientHeight ?? 0;

    if (active_index !== -1) {
      const active_item_height =
        rendered_sentences[active_index].ref.current?.offsetHeight ?? 0;
      const archived_item_heights = item_heights.reduce(
        (acc, current, index) => {
          if (index < active_index) {
            return acc + current;
          }
          return acc;
        },
        0
      );

      const amount_to_scroll =
        archived_item_heights - (list_height - active_item_height) / 2;
      positionRef.current = amount_to_scroll;

      if (canAutoScrollRef.current) {
        listRef.current?.scrollTo({
          top: amount_to_scroll,
          behavior: "smooth",
        });
      }
      // console.log({ amount_to_scroll });
    }
    // listRef.current?.scrollTo({ top })
  }, [rendered_sentences]);

  useLayoutEffect(() => {
    if (audioRef.current !== null && open_lyric) {
      const handleAudioTimeupdate = () => {
        if (audioRef.current !== null) {
          // lấy thời gian hiện tại của audio
          const current_video_time = Math.floor(
            audioRef.current.currentTime * 1000
          );

          // tìm xem nó có trùng vào khoảng thời gian của câu nào hay ko
          const is_in_sentence = lyric_sentences.findIndex(
            (ls) =>
              ls.start_time <= current_video_time &&
              ls.end_time >= current_video_time
          );

          //  nếu không trùng vào khoảng thời gian của câu nào thì return, ko làm gì cả
          if (is_in_sentence === -1) {
            // lấy câu hát gần nhất có thời gian bắt đầu bằng thời gian kết thúc để chuyển trạng thái thành current
            const next_sen_index = lyric_sentences.findIndex(
              (s) => s.start_time > current_video_time
            );

            // trường hợp đã hát xong, ko có câu hát nào nữa
            const is_finish = lyric_sentences.every(
              (s) => s.end_time < current_video_time
            );
            if (is_finish) {
              const new_active_index = lyric_sentences.length - 1;
              if (activeSentenceIndexRef.current === new_active_index) return;
              setRenderedSentences(
                lyric_sentences.map((s, index) => {
                  if (index < new_active_index)
                    return { ...s, status: "archived" };

                  return { ...s, status: "current" };
                })
              );
              return;
            }

            if (
              next_sen_index !== -1 &&
              lyric_sentences[next_sen_index].start_time ===
                lyric_sentences[next_sen_index].end_time
            ) {
              if (activeSentenceIndexRef.current === next_sen_index) return;
              setRenderedSentences(
                lyric_sentences.map((s, index) => {
                  if (index < next_sen_index)
                    return { ...s, status: "archived" };
                  if (index === next_sen_index)
                    return { ...s, status: "current" };

                  return { ...s, status: "new" };
                })
              );
            } else {
              if (activeSentenceIndexRef.current === next_sen_index - 1) return;
              setRenderedSentences(
                lyric_sentences.map((s, index) => {
                  if (index < next_sen_index - 1)
                    return { ...s, status: "archived" };
                  if (index === next_sen_index - 1)
                    return { ...s, status: "current" };

                  return { ...s, status: "new" };
                })
              );
            }

            return;
          }

          // nếu đang trong cùng một câu hát (active sentence index ko đổi)
          if (activeSentenceIndexRef.current === is_in_sentence) return;

          // nếu trùng vào khoảng thời gian của 1 câu nào đó thì
          // chuyển trạng thái câu đó thành current
          // chuyển trạng thái của những câu trước đó thành archived
          // chuyển trạng thái của những câu sau đó thành new
          const new_lyric_sentences: OutputSentence[] = lyric_sentences.map(
            (ls, index) => {
              if (index < is_in_sentence) return { ...ls, status: "archived" };
              if (index === is_in_sentence) return { ...ls, status: "current" };

              return { ...ls, status: "new" };
            }
          );

          // update lại lyric của bài hát
          setRenderedSentences(new_lyric_sentences);
        }
      };

      handleAudioTimeupdate();
      audioRef.current.addEventListener("timeupdate", handleAudioTimeupdate);

      return () => {
        audioRef.current?.removeEventListener(
          "timeupdate",
          handleAudioTimeupdate
        );
      };
    }
  }, [lyric_sentences, open_lyric]);

  useEffect(() => {
    if (listRef.current) {
      const handleOnWheel = () => {
        canAutoScrollRef.current = false;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          canAutoScrollRef.current = true;
          const active_index = rendered_sentences.findIndex(
            (s) => s.status === "current"
          );

          if (active_index !== -1) {
            listRef.current?.scrollTo({
              top: positionRef.current,
              behavior: "auto",
            });
          }
        }, 4000);
      };
      listRef.current.addEventListener("wheel", handleOnWheel);

      return () => {
        listRef.current?.removeEventListener("wheel", handleOnWheel);
      };
    }
  }, [rendered_sentences]);

  if (!current_song) return null;

  return (
    <Container>
      <Content>
        <div className="lyric-left">
          <div className="thumbnail">
            <img src={current_song.thumbnail} alt="" />
            {is_audio_playing && (
              <div className="audio-playing-icon">
                <AudioPlayingIcon width={32} />
              </div>
            )}
          </div>
        </div>
        <div className="lyric-right">
          <div className="lyric-right-content" ref={listRef}>
            {has_lyric ? (
              <ul className="lyric-list">
                {rendered_sentences.map((s) => (
                  <LyricItem
                    status={s.status}
                    className="lyric-item"
                    key={s.id}
                    ref={s.ref}
                  >
                    {s.data}
                  </LyricItem>
                ))}
              </ul>
            ) : (
              <ul className="lyric-list">
                <LyricItem status="new" className="lyric-item">
                  Lời bài hát đang được cập nhật
                </LyricItem>
              </ul>
            )}
          </div>
        </div>
      </Content>
    </Container>
  );
};

export default SongLyric;
