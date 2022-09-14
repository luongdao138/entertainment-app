import React from "react";
import { OutputSentence } from "../components/LyricModal/LyricContent/SongLyric";
import { Lyric, Word } from "../services/song";

export const convertLyric = (lyric: Lyric): OutputSentence[] => {
  return lyric.sentences.reduce((acc, current) => {
    const words: Word[] = current.words;
    const first_word = words[0];
    const last_word = words.slice(-1)[0];
    const data = words.map((w) => w.data).join(" ");

    return [
      ...acc,
      {
        id: current.id,
        start_time: first_word.start_time,
        end_time: last_word.end_time,
        data,
        status: "new",
        ref: React.createRef<HTMLLIElement>(),
      },
    ];
  }, [] as OutputSentence[]);
};
