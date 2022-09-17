import React, { useEffect, useMemo, useRef } from 'react';
import { toast } from 'react-toastify';
import { ReplayMode } from '../../constants/options';
import { useAudioContext } from '../../context/AudioContext';
import {
  getAudioCanAutoPlay,
  getAudioCurrentListSongs,
  getAudioCurrentPlaylistSelector,
  getAudioCurrentSongSelector,
  getAudioMetaSelector,
  getAudioStateSelector,
  getAudioVolumeSelector,
} from '../../redux/audioPlayer/audioPlayerSelectors';
import {
  changeAudioCurrentMeta,
  changeAudioCurrentState,
} from '../../redux/audioPlayer/audioPlayerSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const AudioPlayer = () => {
  const current_song = useAppSelector(getAudioCurrentSongSelector);
  const current_playlist = useAppSelector(getAudioCurrentPlaylistSelector);
  const audio_volume = useAppSelector(getAudioVolumeSelector);
  const audio_list_songs = useAppSelector(getAudioCurrentListSongs);
  const { playback_rate, replay_mode } = useAppSelector(getAudioStateSelector);
  const can_auto_play = useAppSelector(getAudioCanAutoPlay);
  const { is_audio_playing } = useAppSelector(getAudioMetaSelector);

  const { audioRef, handlePlayAudio, handleMoveToNextSong } = useAudioContext();
  const dispatch = useAppDispatch();

  const handleAudioEndRef = useRef<() => void>();

  handleAudioEndRef.current = () => {
    if (replay_mode !== ReplayMode.ONE) {
      handleMoveToNextSong(true);
    } else {
      // người dùng đang bật chế độ nghe lại một bài => khi bài hát này kết thúc thì phát lại chính bài hát này
      audioRef.current?.load();
      audioRef.current?.play();
    }
  };

  const current_queue_song = audio_list_songs.find((s) => s.is_current_audio);

  useEffect(() => {
    if (current_song?.url && audioRef?.current) {
      const handleAudioLoadedMetadata = () => {
        console.log(
          'Audio event fire: loadedmetadata, song name: ',
          current_song.name
        );
      };

      const handleAudioLoadedData = () => {
        console.log(
          'Audio event fire: loadeddata, song name: ',
          current_song.name
        );

        // mỗi khi data của 1 bài hát được load thì sẽ tắt trạng thái loading
        dispatch(
          changeAudioCurrentMeta({
            new_meta: {
              is_audio_loaded: true,
              is_audio_loading: false,
              is_audio_error: false,
            },
          })
        );

        // tự động phát bài hát mỗi khi data được load thành công
        // trong một số trường hợp ko đc auto play bài hát => cần xem xét sau, hiện tại luôn bật chức năng autoplay bài hát
        if (!can_auto_play) {
          console.log('Stop here');
          // nếu ko bật chế độ phát lại và đây là bài cuối cùng => return
          return;
        }
        handlePlayAudio();
      };

      const handleAudioEmptied = () => {
        console.log(
          'Audio event fire: emptied, song name: ',
          current_song.name
        );
      };

      const handleAudioCanPlay = () => {
        console.log(
          'Audio event fire: canplay, song name: ',
          current_song.name
        );

        // khi browser xác định bài hát đã có thể phát thì sẽ tắt trạng thái loading
        dispatch(
          changeAudioCurrentMeta({
            new_meta: {
              is_audio_loaded: true,
              is_audio_loading: false,
              is_audio_error: false,
            },
          })
        );
      };

      const handleAudioCanPlayThrough = () => {
        console.log(
          'Audio event fire: canplaythrough, song name: ',
          current_song.name
        );
      };

      const handleAudioError = () => {
        toast.error('Có lỗi xảy ra, không thể phát bài hát');
        console.log('Audio event fire: error, song name: ', current_song.name);
        dispatch(
          changeAudioCurrentMeta({
            new_meta: {
              is_audio_loaded: false,
              is_audio_loading: false,
              is_audio_error: true,
            },
          })
        );
      };

      const handleAudioPlay = () => {
        console.log('Audio event fire: play, song name: ', current_song.name);
        // dispatch(
        //   changeAudioCurrentMeta({ new_meta: { is_audio_playing: true } })
        // );
      };

      const handleAudioPause = () => {
        console.log('Audio event fire: pause, song name: ', current_song.name);
        // dispatch(
        //   changeAudioCurrentMeta({ new_meta: { is_audio_playing: false } })
        // );
      };

      const handleAudioPlaying = () => {
        console.log(
          'Audio event fire: playing, song name: ',
          current_song.name
        );
      };

      const handleAudioDurationChange = () => {
        console.log(
          'Audio event fire: durationchange, song name: ',
          current_song.name
        );

        if (audioRef.current)
          dispatch(
            changeAudioCurrentState({
              new_state: { duration: audioRef.current.duration },
            })
          );
      };

      const handleAudioVolumeChange = () => {
        console.log(
          'Audio event fire: volumechange, song name: ',
          current_song.name
        );
      };

      const handleAudioSeeking = () => {
        console.log(
          'Audio event fire: seeking, song name: ',
          current_song.name
        );

        // khi người dùng thay đổi seekbar, thì data sẽ được load => set trạng thái thành loading
        // đến khi sự kiện canplay đc fire thì có thể phát đc bài hát
        dispatch(
          changeAudioCurrentMeta({
            new_meta: {
              is_audio_loading: true,
              // is_audio_error: false,
            },
          })
        );
      };

      const handleAudioSeeked = () => {
        console.log('Audio event fire: seeked, song name: ', current_song.name);
      };

      const handleAudioEnded = () => {
        console.log('Audio event fire: ended, song name: ', current_song.name);
        handleAudioEndRef.current?.();
      };

      const handleRateChange = () => {
        console.log(
          'Audio event fire: ratechange, song name: ',
          current_song.name
        );
      };

      // load data
      audioRef.current.addEventListener(
        'loadedmetadata',
        handleAudioLoadedMetadata
      );
      audioRef.current.addEventListener('loadeddata', handleAudioLoadedData);
      audioRef.current.addEventListener('emptied', handleAudioEmptied);
      audioRef.current.addEventListener('canplay', handleAudioCanPlay);
      audioRef.current.addEventListener(
        'canplaythrough',
        handleAudioCanPlayThrough
      );
      audioRef.current.addEventListener('error', handleAudioError);
      audioRef.current.addEventListener('play', handleAudioPlay);
      audioRef.current.addEventListener('pause', handleAudioPause);
      audioRef.current.addEventListener('error', handleAudioPlaying);

      // video state change
      // audioRef.current.addEventListener('timeupdate', handleAudioTimeUpdate);
      audioRef.current.addEventListener(
        'volumechange',
        handleAudioVolumeChange
      );
      audioRef.current.addEventListener(
        'durationchange',
        handleAudioDurationChange
      );
      audioRef.current.addEventListener('ended', handleAudioEnded);
      audioRef.current.addEventListener('ratechange', handleRateChange);
      audioRef.current.addEventListener('seeking', handleAudioSeeking);
      audioRef.current.addEventListener('seeking', handleAudioSeeked);

      return () => {
        audioRef.current?.removeEventListener(
          'loadedmetadata',
          handleAudioLoadedMetadata
        );
        audioRef.current?.removeEventListener(
          'loadeddata',
          handleAudioLoadedData
        );
        audioRef.current?.removeEventListener('emptied', handleAudioEmptied);
        audioRef.current?.removeEventListener('canplay', handleAudioCanPlay);
        audioRef.current?.removeEventListener(
          'canplaythrough',
          handleAudioCanPlayThrough
        );
        audioRef.current?.removeEventListener('error', handleAudioError);
        audioRef.current?.removeEventListener('play', handleAudioPlay);
        audioRef.current?.removeEventListener('error', handleAudioPlaying);

        // audioRef.current?.removeEventListener(
        //   'timeupdate',
        //   handleAudioTimeUpdate
        // );
        audioRef.current?.removeEventListener(
          'volumechange',
          handleAudioVolumeChange
        );
        audioRef.current?.removeEventListener(
          'durationchange',
          handleAudioDurationChange
        );
        audioRef.current?.removeEventListener('ended', handleAudioEnded);
        audioRef.current?.removeEventListener('seeking', handleAudioSeeking);
        audioRef.current?.removeEventListener('seeking', handleAudioSeeked);
      };
    }
  }, [
    current_song?.id,
    current_song?.id,
    current_playlist?.id,
    replay_mode,
    can_auto_play,
  ]);

  // mỗi khi thay đổi bài hát thì sẽ thay đổi trạng thái thành loading
  useEffect(() => {
    if (current_queue_song?.queue_id && audioRef.current) {
      audioRef.current.load();
      // audioRef.current.play();
      dispatch(
        changeAudioCurrentMeta({
          new_meta: {
            is_audio_loading: true,
            is_audio_playing: false,
            is_audio_error: false,
            is_audio_loaded: false,
          },
        })
      );

      dispatch(changeAudioCurrentState({ new_state: { duration: 0 } }));
    }
  }, [current_queue_song?.queue_id, current_playlist?.id]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = audio_volume;
  }, [audio_volume]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = playback_rate.value;
  }, [playback_rate]);

  useEffect(() => {
    if (audioRef.current) {
      if (is_audio_playing) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [is_audio_playing]);

  if (!current_song) return null;

  const Audio = useMemo(() => {
    return (
      <audio
        preload='metadata'
        controls
        ref={audioRef}
        src={current_queue_song?.url}
        hidden
      >
        <p>
          Your browser does not support HTML audio, but you can still
          <a href={current_song.url} download target='_blank'>
            download the music
          </a>
          .
        </p>
      </audio>
    );
  }, [current_queue_song?.id, audio_volume, playback_rate, is_audio_playing]);

  return Audio;
};

export default AudioPlayer;
