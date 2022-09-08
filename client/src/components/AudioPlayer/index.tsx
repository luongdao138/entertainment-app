import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAudioContext } from '../../context/AudioContext';
import { getAudioCurrentSongSelector } from '../../redux/audioPlayer/audioPlayerSelectors';
import { changeAudioCurrentMeta } from '../../redux/audioPlayer/audioPlayerSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const AudioPlayer = () => {
  const current_song = useAppSelector(getAudioCurrentSongSelector);
  const { audioRef, handlePlayAudio } = useAudioContext();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (current_song?.url && audioRef.current) {
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
        dispatch(
          changeAudioCurrentMeta({
            new_meta: {
              is_audio_loaded: true,
              is_audio_loading: false,
              is_audio_error: false,
            },
          })
        );

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
        dispatch(
          changeAudioCurrentMeta({ new_meta: { is_audio_playing: true } })
        );
      };

      const handleAudioPause = () => {
        console.log('Audio event fire: pause, song name: ', current_song.name);
        dispatch(
          changeAudioCurrentMeta({ new_meta: { is_audio_playing: false } })
        );
      };

      const handleAudioPlaying = () => {
        console.log(
          'Audio event fire: playing, song name: ',
          current_song.name
        );
      };

      const handleAudioTimeUpdate = () => {
        console.log(
          'Audio event fire: timeupdate, song name: ',
          current_song.name
        );
      };

      const handleAudioDurationChange = () => {
        console.log(
          'Audio event fire: durationchange, song name: ',
          current_song.name
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
      };

      const handleAudioSeeked = () => {
        console.log('Audio event fire: seeked, song name: ', current_song.name);
      };

      const handleAudioEnded = () => {
        console.log('Audio event fire: ended, song name: ', current_song.name);
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
      audioRef.current.addEventListener('timeupdate', handleAudioTimeUpdate);
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

        audioRef.current?.removeEventListener(
          'timeupdate',
          handleAudioTimeUpdate
        );
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
  }, []);

  useEffect(() => {
    if (current_song) {
      dispatch(
        changeAudioCurrentMeta({
          new_meta: {
            is_audio_loading: true,
            is_audio_playing: false,
            is_audio_error: false,
          },
        })
      );
    }
  }, [current_song]);

  if (!current_song) return null;

  return (
    <audio
      preload='metadata'
      controls
      ref={audioRef}
      src={current_song.url}
      hidden
    >
      <p>
        Your browser does not support HTML audio, but you can still
        <a href={current_song.url} target='_blank'>
          download the music
        </a>
        .
      </p>
    </audio>
  );
};

export default AudioPlayer;
