import { AudioSong } from '../redux/audioPlayer/audioPlayerSlice';
import { AudioType } from '../services/song';

export const convertListAudioSong = (
  list: AudioSong[],
  audio_type: AudioType
): AudioSong[] => {
  return list.map((s) => ({ ...s, audio_type }));
};
