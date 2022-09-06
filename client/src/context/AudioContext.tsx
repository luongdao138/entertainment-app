import _ from 'lodash';
import React, { useContext, useRef, useEffect } from 'react';
import useBoolean from '../hooks/useBoolean';
import {
  getAudioArchivedListSelector,
  getAudioCurrentListSongs,
  getAudioCurrentSongSelector,
  getAudioNextListSelector,
  getAudioStateSelector,
} from '../redux/audioPlayer/audioPlayerSelectors';
import {
  AudioPlaylist,
  AudioSong,
  changeAudioArchivedList,
  changeAudioCurrentPlaylist,
  changeAudioCurrentSong,
  changeAudioCurrentState,
  changeAudioListSongs,
  changeAudioNextList,
  changeAudioRecommendedList,
} from '../redux/audioPlayer/audioPlayerSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getRecommendedSongsAction } from '../redux/song/songActions';
import { useAuthContext } from './AuthContext';

interface ClickAudioParams {
  song: AudioSong;
  playlist: AudioPlaylist | null;
  list_songs: AudioSong[];
  is_from_recommend?: boolean;
  playlist_play_random?: boolean;

  // biến này nếu set thành true thì sẽ luôn luôn tính toán lại các yêu tố cho dù hai bài hát có giống nhau
  // đang dùng trong trường hợp khi click vào một playlist
  force_replace?: boolean;
}

interface ContextState {
  openPlayer: boolean;
  // handleOpenPlayer: () => void;
  // handleClosePlayer: () => void;
  openQueue: boolean;
  handleToggleQueue: () => void;
  handleCloseQueue: () => void;
  playerRef: React.RefObject<HTMLDivElement>;
  handleClickSongAudio: (params: ClickAudioParams) => void;
}

const AudioContext = React.createContext<ContextState>({} as ContextState);

const AudioContextProvider = ({ children }: { children: React.ReactNode }) => {
  // const {
  //   value: openPlayer,
  // } = useBoolean(false);
  const {
    value: openQueue,
    setFalse: handleCloseQueue,
    toggle: handleToggleQueue,
  } = useBoolean(false);
  const { authUser } = useAuthContext();

  const current_song = useAppSelector(getAudioCurrentSongSelector);
  const audio_state = useAppSelector(getAudioStateSelector);
  const archived_list = useAppSelector(getAudioArchivedListSelector);
  const next_list = useAppSelector(getAudioNextListSelector);
  const audio_list_songs = useAppSelector(getAudioCurrentListSongs);

  const playerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const openPlayer = Boolean(current_song);

  const handleClickSongAudio = (params: ClickAudioParams) => {
    const {
      song,
      list_songs,
      playlist,
      is_from_recommend,
      playlist_play_random,
      force_replace,
    } = params;
    if (song.id === current_song?.id && !force_replace) {
      // đây là trường hợp chọn một bài hát đang phát
      // đối với case này chỉ thay đổi trạng thái play/pause của player chứ ko thay đổi current_song
      // sẽ xử lý sau
    } else {
      // trường hợp này user muốn đổi bài hát khác
      let is_shuffle = playlist_play_random ?? audio_state.is_shuffle;
      if (!_.isNil(playlist_play_random)) {
        dispatch(
          changeAudioCurrentState({
            new_state: { is_shuffle: playlist_play_random },
          })
        );
      }

      dispatch(changeAudioCurrentSong({ new_current_song: song }));
      dispatch(
        changeAudioCurrentState({
          new_state: { is_from_recommend: Boolean(is_from_recommend) },
        })
      );

      if (is_from_recommend) {
        // nếu bài hát được chọn từ danh sách gợi ý
        dispatch(changeAudioNextList({ list: [] }));
        let new_recommended_list = list_songs.filter((s) => s.id !== song.id);
        new_recommended_list = _.shuffle(new_recommended_list).slice(0, 10);

        dispatch(changeAudioArchivedList({ list: [song] }));
        dispatch(changeAudioRecommendedList({ list: new_recommended_list }));
        dispatch(changeAudioCurrentPlaylist({ playlist: null }));
        dispatch(changeAudioListSongs({ list: list_songs }));
        return;
      }

      // khi thay đổi bài hát, chúng ta phải thay đổi luôn các list trong player queue tương ứng với bài hát này
      if (is_shuffle) {
        // nếu audio đang ở state shuffle
        // list archive chỉ có duy nhất bài hát được chọn
        dispatch(changeAudioArchivedList({ list: [song] }));

        // loại bài hát được chọn ra và đảo các bài hát còn lại của favourite list => ta được next list
        let new_list = list_songs.filter((s) => s.id !== song.id);
        new_list = _.shuffle(new_list);
        dispatch(changeAudioNextList({ list: new_list }));
      } else {
        // đây là trường hợp audio đang ko ở chế độ shuffle

        // trường hợp này, archived_list chính là bài hát được chọn và những bài hát nằm trước nó
        const index = list_songs.findIndex((s) => s.id === song.id);
        if (index !== -1) {
          const new_archived_list = list_songs.slice(0, index + 1);
          const new_next_list = list_songs.slice(index + 1);

          dispatch(changeAudioArchivedList({ list: new_archived_list }));
          dispatch(changeAudioNextList({ list: new_next_list }));
        }

        // còn next_list chính là những bài hát nằm sau bài hát được chọn trong playlist
      }

      // lưu list hiện tại vào redux
      dispatch(changeAudioListSongs({ list: list_songs }));

      // Lưu playlist hiện tại vào redux nếu có
      if (playlist) {
        dispatch(changeAudioCurrentPlaylist({ playlist }));
      }

      // gọi api để lấy danh sách bài hát đc recommend mỗi khi bài hát được chọn thay đổi
      // có thể cần thêm các điều kiện để gọi API này, cần kiểm tra lại => chỉ lấy những bài hát ko được upload bởi current auth user

      if (authUser?.id !== params.song.user_id) {
        // call api here
        dispatch(
          getRecommendedSongsAction({
            data: {
              exclude_song_ids: list_songs
                ? list_songs
                    .filter((s) => s.id !== params.song.id)
                    .map((s) => s.id)
                : [],
            },
            song_id: params.song.id,
          })
        );
      } else {
        dispatch(changeAudioRecommendedList({ list: [] }));
      }
    }
  };

  useEffect(() => {
    // mỗi khi mà is_shuffle thay đổi
    if (!current_song || audio_state.is_from_recommend) {
      return;
    }

    if (audio_state.is_shuffle) {
      dispatch(changeAudioArchivedList({ list: [current_song] }));
      const new_next_list = _.shuffle([...archived_list, ...next_list]).filter(
        (s) => s.id !== current_song.id
      );
      dispatch(changeAudioNextList({ list: new_next_list }));
    } else {
      // trường hợp này, archived_list chính là bài hát được chọn và những bài hát nằm trước nó
      const index = audio_list_songs.findIndex((s) => s.id === current_song.id);
      if (index !== -1) {
        const new_archived_list = audio_list_songs.slice(0, index + 1);
        const new_next_list = audio_list_songs.slice(index + 1);

        dispatch(changeAudioArchivedList({ list: new_archived_list }));
        dispatch(changeAudioNextList({ list: new_next_list }));
      }
    }
  }, [audio_state.is_shuffle]);

  return (
    <AudioContext.Provider
      value={{
        openPlayer,
        openQueue,
        handleToggleQueue,
        handleCloseQueue,
        playerRef,
        handleClickSongAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export default AudioContextProvider;
export const useAudioContext = () => useContext(AudioContext);
