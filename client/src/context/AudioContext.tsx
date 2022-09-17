import _ from 'lodash';
import React, { useContext, useRef, useState, useEffect } from 'react';
import {
  getAudioArchivedListSelector,
  getAudioCanAutoPlay,
  getAudioCurrentListSongs,
  getAudioCurrentSongSelector,
  getAudioMetaSelector,
  getAudioNextListSelector,
  getAudioRecommendListSelector,
  getAudioStateSelector,
} from '../redux/audioPlayer/audioPlayerSelectors';
import {
  addSongsToPlayerList,
  addSongToPlayNext,
  AudioPlaylist,
  AudioSong,
  changeAudioArchivedList,
  changeAudioCurrentMeta,
  changeAudioCurrentPlaylist,
  changeAudioCurrentSong,
  changeAudioCurrentSongData,
  changeAudioCurrentState,
  changeAudioListSongs,
  changeAudioNextList,
  changeCanAutoPlay,
  resetAudioPlayer,
} from '../redux/audioPlayer/audioPlayerSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getRecommendedSongsAction } from '../redux/song/songActions';
import { useAuthContext } from './AuthContext';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';
import { playbackRateOptions, ReplayMode } from '../constants/options';

export interface ClickAudioParams {
  song: AudioSong;
  playlist: AudioPlaylist | null;
  list_songs: AudioSong[];
  is_from_recommend?: boolean;
  playlist_play_random?: boolean;

  // biến này nếu set thành true thì sẽ luôn luôn tính toán lại các yêu tố cho dù hai bài hát có giống nhau
  // đang dùng trong trường hợp khi click vào một playlist
  force_replace?: boolean;
}

export interface AddSongToPlayerParams {
  songs: AudioSong[];
  playlist: AudioPlaylist | null;
  queue_playlist_id?: string;
  // playlist_play_random?: boolean;
}

export interface AddSongToPlayNextParams {
  song: AudioSong;
  queue_playlist_id?: string;
}

interface ContextState {
  openPlayer: boolean;
  openQueue: boolean;
  audio_alarm: number | null;
  turnOnAudioAlarm: (time: number) => void;
  turnOffAudioAlarm: () => void;
  handleToggleQueue: () => void;
  handleCloseQueue: () => void;
  playerRef: React.RefObject<HTMLDivElement>;
  handleClickSongAudio: (params: ClickAudioParams) => void;
  handleAddSongsToPlayerQueue: (params: AddSongToPlayerParams) => void;
  handleAddSongToPlayNext: (params: AddSongToPlayNextParams) => void;
  handleRemoveSongsOutOfPlayQueue: (queue_id: string) => void;
  handleChangeAutoPlayRecommend: (value: boolean) => void;
  handleClickQueueSong: (queue_id: string) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  handlePlayAudio: () => void;
  handlePauseAudio: () => void;
  handleToggleAudioPlayState: () => void;
  handleChangeAudioVolume: (value: number) => void;
  handleChangeAudioCurrentTime: (value: number, can_change?: boolean) => void;
  handleChangeAudioPlaybackRate: (value: number) => void;
  handleMoveToNextSong: (on_end_move?: boolean) => void;
  handleMoveToPrevSong: () => void;
}

const AudioContext = React.createContext<ContextState>({} as ContextState);

const AudioContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [openQueue, setOpenQueue] = useState<boolean>(false);
  const [audio_alarm, setAudioAlarm] = useState<number | null>(null);
  const { authUser } = useAuthContext();

  const current_song = useAppSelector(getAudioCurrentSongSelector);
  const audio_state = useAppSelector(getAudioStateSelector);
  const audio_meta = useAppSelector(getAudioMetaSelector);
  const archived_list = useAppSelector(getAudioArchivedListSelector);
  const next_list = useAppSelector(getAudioNextListSelector);
  const recommend_list = useAppSelector(getAudioRecommendListSelector);
  const audio_list_songs = useAppSelector(getAudioCurrentListSongs);
  const can_auto_play = useAppSelector(getAudioCanAutoPlay);

  const playerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const openPlayer = Boolean(current_song);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleToggleQueue = () => {
    setOpenQueue((prev) => !prev);
  };
  const handleCloseQueue = () => {
    setOpenQueue(false);
  };

  const turnOnAudioAlarm = (time: number) => {
    setAudioAlarm(time);
  };

  const turnOffAudioAlarm = () => {
    console.log('Reset audio alarm');
    setAudioAlarm(null);
  };

  const resetLastSong = () => {
    if (!can_auto_play) dispatch(changeCanAutoPlay(true));
  };

  const handleClickSongAudio = (params: ClickAudioParams) => {
    const {
      song,
      list_songs,
      playlist,
      is_from_recommend,
      playlist_play_random,
      // playlist_play_random,
      force_replace,
    } = params;
    resetLastSong();
    if (song.id === current_song?.id && !force_replace) {
      // đây là trường hợp chọn một bài hát đang phát
      // đối với case này chỉ thay đổi trạng thái play/pause của player chứ ko thay đổi current_song
      // sẽ xử lý sau
      console.log('this song is selected');
      handleToggleAudioPlayState();
    } else {
      // trường hợp này user muốn đổi bài hát khác
      let is_shuffle = playlist_play_random ?? audio_state.is_shuffle;
      let new_lists_songs = list_songs.map((s) => ({
        ...s,
        is_current_audio: s.id === song.id,
        queue_id: uuid(),
        queue_playlist_id: playlist ? playlist.id : null,
      }));

      // playlist có đặt chế độ phát ngẫu nhiên hay ko
      if (!_.isNil(playlist_play_random)) {
        dispatch(
          changeAudioCurrentState({
            new_state: { is_shuffle: playlist_play_random },
          })
        );
      }

      // lưu bài hát được chọn vào redux
      dispatch(changeAudioCurrentSong({ new_current_song: song }));
      dispatch(
        changeAudioCurrentState({
          new_state: { is_from_recommend: Boolean(is_from_recommend) },
        })
      );
      // Lưu playlist hiện tại vào redux nếu có
      dispatch(changeAudioCurrentPlaylist({ playlist }));

      if (is_from_recommend) {
        const is_included = new_lists_songs.find((s) => s.is_current_audio);
        if (is_included) {
          const new_recommended_list = new_lists_songs.filter(
            (s) => !s.is_current_audio
          );
          dispatch(
            changeAudioCurrentSongData({
              next_list: [],
              recommended_list: _.shuffle(new_recommended_list),
              audio_list_songs: [is_included],
              archived_list: [is_included],
            })
          );
        } else {
          const queue_song = {
            ...song,
            is_current_audio: true,
            queue_id: uuid(),
          };
          dispatch(
            changeAudioCurrentSongData({
              next_list: [],
              recommended_list: new_lists_songs,
              audio_list_songs: [queue_song],
              archived_list: [queue_song],
            })
          );
        }
        return;
      }

      // khi thay đổi bài hát, chúng ta phải thay đổi luôn các list trong player queue tương ứng với bài hát này
      if (is_shuffle) {
        // nếu audio đang ở state shuffle
        // list archive chỉ có duy nhất bài hát được chọn
        const is_included = new_lists_songs.find((s) => s.is_current_audio);
        if (is_included) {
          dispatch(
            changeAudioArchivedList({
              list: [is_included],
            })
          );
        }

        // loại bài hát được chọn ra và đảo các bài hát còn lại của favourite list => ta được next list
        let new_list = new_lists_songs.filter((s) => !s.is_current_audio);
        new_list = _.shuffle(new_list);
        dispatch(
          changeAudioNextList({
            list: new_list,
          })
        );
      } else {
        // đây là trường hợp audio đang ko ở chế độ shuffle

        // trường hợp này, archived_list chính là bài hát được chọn và những bài hát nằm trước nó
        const index = new_lists_songs.findIndex((s) => s.is_current_audio);
        if (index !== -1) {
          const new_archived_list = new_lists_songs.slice(0, index + 1);
          const new_next_list = new_lists_songs.slice(index + 1);

          dispatch(
            changeAudioCurrentSongData({
              archived_list: new_archived_list,
              next_list: new_next_list,
            })
          );
        }

        // còn next_list chính là những bài hát nằm sau bài hát được chọn trong playlist
      }

      // lưu list hiện tại vào redux
      dispatch(changeAudioListSongs({ list: new_lists_songs }));

      // gọi api để lấy danh sách bài hát đc recommend mỗi khi bài hát được chọn thay đổi
      // có thể cần thêm các điều kiện để gọi API này, cần kiểm tra lại => chỉ lấy những bài hát ko được upload bởi current auth user

      // if (authUser?.id !== params.song.user_id) {
      // call api here
      dispatch(
        getRecommendedSongsAction({
          data: {
            exclude_song_ids: list_songs ? list_songs.map((s) => s.id) : [],
          },
          song_id: params.song.id,
        })
      );
      // } else {
      // dispatch(changeAudioRecommendedList({ list: [] }));
      // }
    }
  };

  const handleAddSongsToPlayerQueue = (params: AddSongToPlayerParams) => {
    const { songs, playlist, queue_playlist_id } = params;

    if (songs.length === 0) {
      toast.success('Đã thêm bài hát vào danh sách phát');
      return;
    }

    if (!openPlayer) {
      // khi danh sách phát đang rỗng
      if (playlist) {
        // trường hợp này là thêm cả playlist vào danh sách phát
        // song chính là những bài hát trong playlist này
        handleClickSongAudio({
          list_songs: songs,
          playlist,
          song: songs[0],
          playlist_play_random: playlist.play_random,
        });
      } else {
        if (songs.length === 1) {
          let new_song = songs[0];
          new_song = {
            ...new_song,
            is_current_audio: true,
            queue_id: uuid(),
            queue_playlist_id,
          };
          dispatch(
            changeAudioCurrentSongData({
              current_song: songs[0],
              archived_list: [new_song],
              audio_list_songs: [new_song],
            })
          );
          dispatch(
            getRecommendedSongsAction({
              data: {
                exclude_song_ids: [new_song.id],
              },
              song_id: new_song.id,
            })
          );
        } else {
          let first_song: AudioSong = {
            ...songs[0],
            is_current_audio: true,
            queue_id: uuid(),
          };
          let left_songs: AudioSong[] = songs
            .slice(1)
            .map((s) => ({ ...s, is_current_audio: false, queue_id: uuid() }));

          dispatch(
            changeAudioCurrentSongData({
              current_song: songs[0],
              archived_list: [first_song],
              audio_list_songs: [first_song, ...left_songs],
              next_list: audio_state.is_shuffle
                ? _.shuffle(left_songs)
                : left_songs,
            })
          );

          dispatch(
            getRecommendedSongsAction({
              data: {
                exclude_song_ids: left_songs.map((s) => s.id),
              },
              song_id: first_song.id,
            })
          );
        }
      }
    } else {
      console.log('Handle add songs to player queue: ', songs);
      dispatch(addSongsToPlayerList({ songs, queue_playlist_id }));
    }
    toast.success('Đã thêm bài hát vào danh sách phát');
  };

  const handleAddSongToPlayNext = (params: AddSongToPlayNextParams) => {
    if (!openPlayer) {
      handleAddSongsToPlayerQueue({
        playlist: null,
        songs: [params.song],
        queue_playlist_id: params.queue_playlist_id,
      });
    } else {
      dispatch(
        addSongToPlayNext({
          song: params.song,
          queue_playlist_id: params.queue_playlist_id,
        })
      );
      toast.success('Đã thêm bài hát vào danh sách phát');
    }
  };

  const handleRemoveSongsOutOfPlayQueue = (queue_id: string) => {
    // const song = audio_list_songs.find((s) => s.queue_id === queue_id);
    // const current_song = audio_list_songs.find((s) => s.is_current_audio);

    const is_archived_index = archived_list.findIndex(
      (s) => s.queue_id === queue_id && !s.is_current_audio
    );
    const is_next_index = next_list.findIndex((s) => s.queue_id === queue_id);
    const is_current_index = archived_list.findIndex(
      (s) => s.queue_id === queue_id && s.is_current_audio
    );

    if (is_archived_index !== -1) {
      // xóa bài hát đã phát
      const new_archived_list = archived_list.filter(
        (s) => s.queue_id !== queue_id
      );
      const new_list_songs = audio_list_songs.filter(
        (s) => s.queue_id !== queue_id
      );
      dispatch(
        changeAudioCurrentSongData({
          archived_list: new_list_songs,
          audio_list_songs: new_list_songs,
        })
      );
      return;
    }

    if (is_next_index !== -1) {
      // xóa bài hát sắp phát
      const new_next_list = next_list.filter((s) => s.queue_id !== queue_id);
      const new_list_songs = audio_list_songs.filter(
        (s) => s.queue_id !== queue_id
      );
      dispatch(
        changeAudioCurrentSongData({
          next_list: new_next_list,
          audio_list_songs: new_list_songs,
        })
      );
      return;
    }

    if (is_current_index !== -1) {
      // xóa bài hát đang phát
      if (next_list.length > 0) {
        // trong danh sách bài hát tiếp theo đang còn bài
        // thì sẽ lấy bài đầu tiên trong danh sách này đưa vào archive list và trở thành bài đang phát
        // bài đang phát sẽ bị xóa đi

        const [removed] = [...next_list].splice(0, 1);
        const new_next_list = next_list.slice(1);
        const new_current_audio: AudioSong = {
          ...removed,
          is_current_audio: true,
        };
        const new_current_song: AudioSong = _.omit(removed, [
          'is_current_audio',
          'queue_id',
        ]);
        let new_archived_list = archived_list.filter(
          (s) => s.queue_id !== queue_id
        );
        new_archived_list.push(new_current_audio);

        const new_list_songs = audio_list_songs
          .filter((s) => s.queue_id !== queue_id)
          .map((s) =>
            s.queue_id === new_current_audio.queue_id
              ? { ...s, is_current_audio: true }
              : { ...s, is_current_audio: false }
          );

        dispatch(
          changeAudioCurrentSongData({
            next_list: new_next_list,
            archived_list: new_archived_list,
            audio_list_songs: new_list_songs,
            current_song: new_current_song,
          })
        );
        dispatch(
          getRecommendedSongsAction({
            data: {
              exclude_song_ids: new_list_songs.map((s) => s.id),
            },
            song_id: new_current_song.id,
          })
        );
      } else if (archived_list.length > 1) {
        // trường hợp này list bài hát tiếp theo đã hết nhưng list archive đang còn
        // => lấy bài hát đầu tiên của archive list làm current_song, những bài hát sau đó sẽ làm next list

        const [removed] = [...archived_list].splice(0, 1);
        const new_next_list = archived_list
          .slice(1)
          .filter((s) => s.queue_id !== queue_id);
        const new_current_audio: AudioSong = {
          ...removed,
          is_current_audio: true,
        };
        const new_current_song: AudioSong = _.omit(removed, [
          'is_current_audio',
          'queue_id',
        ]);
        const new_list_songs = audio_list_songs
          .filter((s) => s.queue_id !== queue_id)
          .map((s) =>
            s.queue_id === new_current_audio.queue_id
              ? { ...s, is_current_audio: true }
              : { ...s, is_current_audio: false }
          );

        dispatch(
          changeAudioCurrentSongData({
            next_list: new_next_list,
            archived_list: [new_current_audio],
            audio_list_songs: new_list_songs,
            current_song: new_current_song,
          })
        );
        dispatch(
          getRecommendedSongsAction({
            data: {
              exclude_song_ids: new_list_songs.map((s) => s.id),
            },
            song_id: new_current_song.id,
          })
        );
      } else {
        // trường hợp này, cả list next và archive đều đã hết => check đến list recommended
        // nếu auto_play_recommend đang bật => tiếp tục phát nhạc của recommend list
        // nếu auto_play_recommend đang tắt thì xóa nốt bài hát cuối cùng, tắt trình phát nhạc

        if (!audio_state.is_autoplay_recommend) {
          // tự động phát đang tắt
          dispatch(resetAudioPlayer());
        } else {
          // tự động phát đang bật
          if (recommend_list.length === 0) {
            dispatch(resetAudioPlayer());
          } else {
            const first_song = recommend_list[0];
            const new_current_song: AudioSong = _.omit(first_song, [
              'queue_id',
              'is_current_audio',
            ]);
            const new_current_audio: AudioSong = {
              ...first_song,
              is_current_audio: true,
            };
            const new_recommend_list = recommend_list.slice(1);

            dispatch(
              changeAudioCurrentSongData({
                current_song: new_current_song,
                recommended_list: new_recommend_list,
                archived_list: [new_current_audio],
                audio_list_songs: [new_current_audio],
              })
            );
          }
        }
      }
      return;
    }
  };

  const handleChangeAutoPlayRecommend = (value: boolean) => {
    dispatch(
      changeAudioCurrentState({ new_state: { is_autoplay_recommend: value } })
    );
  };

  const handleClickQueueSong = (queue_id: string) => {
    resetLastSong();
    const is_archived_index = archived_list.findIndex(
      (s) => s.queue_id === queue_id && !s.is_current_audio
    );
    const is_next_index = next_list.findIndex((s) => s.queue_id === queue_id);
    const is_current_index = archived_list.findIndex(
      (s) => s.queue_id === queue_id && s.is_current_audio
    );
    const is_recommend_index = recommend_list.findIndex(
      (s) => s.queue_id === queue_id
    );

    if (is_current_index !== -1) {
      // đây là trường hợp click vào bài hát hiện tại đang phát => thay đổi trạng thái play/pause
      // sẽ bổ sung sau
      handleToggleAudioPlayState();
      return;
    }

    if (is_archived_index !== -1) {
      const top = archived_list.slice(0, is_archived_index);
      const bottom = archived_list
        .slice(is_archived_index + 1)
        .map((s) => ({ ...s, is_current_audio: false }));
      let new_current_audio = archived_list[is_archived_index];

      new_current_audio = { ...new_current_audio, is_current_audio: true };
      const new_current_song = _.omit(new_current_audio, [
        'queue_id',
        'is_current_audio',
      ]);
      const new_next_list = [...bottom, ...next_list];
      const new_list_songs = audio_list_songs.map((s) =>
        s.queue_id === new_current_audio.queue_id
          ? { ...s, is_current_audio: true }
          : { ...s, is_current_audio: false }
      );

      dispatch(
        changeAudioCurrentSongData({
          archived_list: [...top, new_current_audio],
          current_song: new_current_song,
          next_list: new_next_list,
          audio_list_songs: new_list_songs,
        })
      );
      dispatch(
        getRecommendedSongsAction({
          data: {
            exclude_song_ids: new_list_songs.map((s) => s.id),
          },
          song_id: new_current_song.id,
        })
      );
      return;
    }

    if (is_next_index !== -1) {
      let new_current_audio = next_list[is_next_index];
      new_current_audio = { ...new_current_audio, is_current_audio: true };
      const new_current_song = _.omit(new_current_audio, [
        'queue_id',
        'is_current_audio',
      ]);

      const top = next_list.slice(0, is_next_index);
      const bottom = next_list.slice(is_next_index + 1);
      const new_archive_list = [
        ...archived_list.map((s) => ({ ...s, is_current_audio: false })),
        ...top,
        new_current_audio,
      ];
      const new_list_songs = audio_list_songs.map((s) =>
        s.queue_id === new_current_audio.queue_id
          ? { ...s, is_current_audio: true }
          : { ...s, is_current_audio: false }
      );

      dispatch(
        changeAudioCurrentSongData({
          current_song: new_current_song,
          archived_list: new_archive_list,
          next_list: bottom,
          audio_list_songs: new_list_songs,
        })
      );
      dispatch(
        getRecommendedSongsAction({
          data: {
            exclude_song_ids: new_list_songs.map((s) => s.id),
          },
          song_id: new_current_song.id,
        })
      );
      return;
    }

    if (is_recommend_index !== -1) {
      let new_current_audio = recommend_list[is_recommend_index];
      new_current_audio = { ...new_current_audio, is_current_audio: true };
      const new_current_song = _.omit(new_current_audio, [
        'queue_id',
        'is_current_audio',
      ]);

      const new_archive_list = [
        ...[...archived_list, ...next_list].map((s) => ({
          ...s,
          is_current_audio: false,
        })),
        new_current_audio,
      ];

      dispatch(changeAudioArchivedList({ list: new_archive_list }));
      dispatch(changeAudioNextList({ list: [] }));
      dispatch(changeAudioCurrentSong({ new_current_song }));
      dispatch(changeAudioListSongs({ list: new_archive_list }));
      dispatch(
        getRecommendedSongsAction({
          data: {
            exclude_song_ids: new_archive_list.map((s) => s.id),
          },
          song_id: new_current_song.id,
        })
      );

      return;
    }
  };

  const handlePlayAudio = () => {
    dispatch(changeAudioCurrentMeta({ new_meta: { is_audio_playing: true } }));
  };

  const handlePauseAudio = () => {
    dispatch(changeAudioCurrentMeta({ new_meta: { is_audio_playing: false } }));
  };

  const handleToggleAudioPlayState = () => {
    if (audioRef.current) {
      if (audio_meta.is_audio_playing) {
        handlePauseAudio();
      } else {
        handlePlayAudio();
      }
    }
  };

  const handleChangeAudioCurrentTime = (
    value: number,
    can_change?: boolean
  ) => {
    if (audioRef.current) {
      dispatch(changeAudioCurrentState({ new_state: { current_time: value } }));
      if (can_change) audioRef.current.currentTime = value;
    }
  };

  const handleChangeAudioVolume = (value: number) => {
    dispatch(changeAudioCurrentState({ new_state: { volume: value } }));
  };

  const handleChangeAudioPlaybackRate = (value: number) => {
    if (audioRef.current) {
      dispatch(
        changeAudioCurrentState({
          new_state: {
            playback_rate: playbackRateOptions.find((o) => o.value === value),
          },
        })
      );
    }
  };

  const handleMoveToNextSong = (on_end_move?: boolean) => {
    if (next_list.length === 0) {
      if (!audio_state.is_autoplay_recommend || recommend_list.length === 0) {
        // đây là trường hợp tự động phát đang tắt hoặc là ko có bài hát nào trong danh sách bài hát gợi ý

        // xét 2 trường hợp, nếu trong list archive chỉ có một bài => reload audio
        // nếu trong list archive có 2 bài trở lên => quay trở lại bài đầu, các bài sau đó đưa vào danh sách tiếp theo

        // xác định xem đây có phải là bài cuối cùng trong queue hay ko
        // nó là bài hát cuối khi và chỉ khi sự kiện on end của thẻ audio đc fire
        if (audio_state.replay_mode === ReplayMode.NONE) {
          dispatch(changeCanAutoPlay(!Boolean(on_end_move)));
        } else if (!can_auto_play) {
          dispatch(changeCanAutoPlay(true));
        }

        if (archived_list.length === 1) {
          dispatch(
            changeAudioCurrentMeta({
              new_meta: {
                is_audio_loading: true,
                is_audio_error: false,
                is_audio_loaded: false,
                is_audio_playing: !Boolean(on_end_move),
              },
            })
          );

          if (audioRef.current) {
            // audioRef.current.currentTime = 0;
            audioRef.current.load();
            if (!Boolean(on_end_move)) audioRef.current.play();
          }
        } else {
          const new_current_audio = {
            ...archived_list[0],
            is_current_audio: true,
          };
          const new_current_song = _.omit(new_current_audio, [
            'is_current_audio',
            'queue_id',
          ]);

          const new_next_list = archived_list
            .slice(1)
            .map((s) => ({ ...s, is_current_audio: false }));
          const new_list_songs = audio_list_songs.map((s) =>
            s.queue_id === new_current_audio.queue_id
              ? { ...s, is_current_audio: true }
              : { ...s, is_current_audio: false }
          );
          const new_archive_list = [new_current_audio];

          dispatch(changeAudioListSongs({ list: new_list_songs }));
          dispatch(changeAudioArchivedList({ list: new_archive_list }));
          dispatch(changeAudioNextList({ list: new_next_list }));
          dispatch(changeAudioCurrentSong({ new_current_song }));
          dispatch(
            getRecommendedSongsAction({
              data: {
                exclude_song_ids: new_list_songs.map((s) => s.id),
              },
              song_id: new_current_song.id,
            })
          );
        }
      } else {
        // đây là trường hợp tự động phát đang bật và đồng thời trong danh sách recommend vẫn còn bài
        // trường hợp này, ta sẽ lấy bài đầu tiên trong danh sách recommend để phát, những bài còn lại làm bài tiếp theo
        resetLastSong();

        const new_current_audio = {
          ...recommend_list[0],
          is_current_audio: true,
        };
        const new_current_song = _.omit(new_current_audio, [
          'is_current_audio',
          'queue_id',
        ]);

        const new_next_list = recommend_list.slice(1);
        const new_archive_list = archived_list
          .map((s) => ({
            ...s,
            is_current_audio: false,
          }))
          .concat(new_current_audio);
        const new_list_songs = [
          ...audio_list_songs.map((s) => ({ ...s, is_current_audio: false })),
          new_current_audio,
          ...new_next_list,
        ];

        dispatch(changeAudioArchivedList({ list: new_archive_list }));
        dispatch(changeAudioNextList({ list: new_next_list }));
        dispatch(changeAudioListSongs({ list: new_list_songs }));
        dispatch(
          getRecommendedSongsAction({
            data: {
              exclude_song_ids: new_list_songs.map((s) => s.id),
            },
            song_id: new_current_song.id,
          })
        );
        dispatch(changeAudioCurrentSong({ new_current_song }));
      }
    } else {
      resetLastSong();
      // trong danh sách bài hát tiếp theo đang còn bài hát => lấy bài đầu tiên trong danh sách này để phát
      const new_current_audio = { ...next_list[0], is_current_audio: true };
      const new_current_song = _.omit(new_current_audio, [
        'is_current_audio',
        'queue_id',
      ]);

      const new_next_list = next_list.slice(1);
      let new_archive_list: AudioSong[] = [...archived_list].map((s) => ({
        ...s,
        is_current_audio: false,
      }));
      const new_list_songs = audio_list_songs.map((s) =>
        s.queue_id === new_current_audio.queue_id
          ? { ...s, is_current_audio: true }
          : { ...s, is_current_audio: false }
      );
      new_archive_list.push(new_current_audio);

      dispatch(changeAudioArchivedList({ list: new_archive_list }));
      dispatch(changeAudioNextList({ list: new_next_list }));
      dispatch(changeAudioListSongs({ list: new_list_songs }));
      dispatch(
        getRecommendedSongsAction({
          data: {
            exclude_song_ids: new_list_songs.map((s) => s.id),
          },
          song_id: new_current_song.id,
        })
      );
      dispatch(changeAudioCurrentSong({ new_current_song }));
    }
  };

  const handleMoveToPrevSong = () => {
    resetLastSong();
    let new_archive_list = [...archived_list];
    let new_next_list = [...next_list];

    let new_current_audio = archived_list[archived_list.length - 2];
    new_current_audio = { ...new_current_audio, is_current_audio: true };
    let removed = archived_list[archived_list.length - 1];
    removed = { ...removed, is_current_audio: false };

    new_archive_list.pop();
    new_archive_list = new_archive_list.map((s, index) =>
      index === new_archive_list.length - 1
        ? { ...s, is_current_audio: true }
        : { ...s, is_current_audio: false }
    );
    new_next_list.unshift(removed);

    const new_current_song = _.omit(new_current_audio, [
      'is_current_audio',
      'queue_id',
    ]);

    const new_list_songs = audio_list_songs.map((s) =>
      s.queue_id === new_current_audio.queue_id
        ? { ...s, is_current_audio: true }
        : { ...s, is_current_audio: false }
    );

    dispatch(changeAudioArchivedList({ list: new_archive_list }));
    dispatch(changeAudioNextList({ list: new_next_list }));
    dispatch(changeAudioListSongs({ list: new_list_songs }));
    dispatch(
      getRecommendedSongsAction({
        data: {
          exclude_song_ids: new_list_songs.map((s) => s.id),
        },
        song_id: new_current_song.id,
      })
    );
    dispatch(changeAudioCurrentSong({ new_current_song }));
  };

  useEffect(() => {
    // mỗi khi mà is_shuffle thay đổi
    if (!current_song) {
      return;
    }

    if (audio_state.is_shuffle) {
      const is_included = audio_list_songs.find((s) => s.is_current_audio);
      if (is_included) {
        const new_next_list = audio_list_songs.filter(
          (s) => !s.is_current_audio
        );
        dispatch(changeAudioArchivedList({ list: [is_included] }));
        dispatch(changeAudioNextList({ list: _.shuffle(new_next_list) }));
      }
    } else {
      // trường hợp này, archived_list chính là bài hát được chọn và những bài hát nằm trước nó
      const index = audio_list_songs.findIndex((s) => s.id === current_song.id);
      if (index !== -1) {
        const new_archived_list = audio_list_songs.slice(0, index + 1);
        const new_next_list = audio_list_songs.slice(index + 1);

        dispatch(
          changeAudioArchivedList({
            list: new_archived_list,
          })
        );
        dispatch(
          changeAudioNextList({
            list: new_next_list,
          })
        );
      }
    }
  }, [audio_state.is_shuffle]);

  // check xem sự thay đổi của các list có đúng ko
  useEffect(() => {
    console.log(
      'Audio list songs change hehe',
      audio_list_songs.map((s) => ({
        queue_id: s.queue_id,
        name: s.name,
        is_current_audio: s.is_current_audio,
        id: s.id,
        queue_playlist_id: s.queue_playlist_id,
      }))
    );
  }, [audio_list_songs]);

  return (
    <AudioContext.Provider
      value={{
        openPlayer,
        openQueue,
        handleToggleQueue,
        handleCloseQueue,
        playerRef,
        handleClickSongAudio,
        handleAddSongsToPlayerQueue,
        handleChangeAutoPlayRecommend,
        handleAddSongToPlayNext,
        handleRemoveSongsOutOfPlayQueue,
        handleClickQueueSong,
        audioRef,
        handlePlayAudio,
        handlePauseAudio,
        handleToggleAudioPlayState,
        handleChangeAudioVolume,
        handleChangeAudioCurrentTime,
        handleChangeAudioPlaybackRate,
        handleMoveToNextSong,
        handleMoveToPrevSong,
        audio_alarm,
        turnOffAudioAlarm,
        turnOnAudioAlarm,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => useContext(AudioContext);
export default AudioContextProvider;
