import React, { useEffect, useRef, useState } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { FiMusic } from 'react-icons/fi';
import {
  allowedAudioFormat,
  allowedImageFormat,
} from '../../utils/uploadFormat';
import { Container } from './style';
import { toast } from 'react-toastify';
import Progress from '../LinearProgress';
import { formatSongDuration } from '../../utils/formatTime';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { uploadSong } from '../../redux/song/songActions';
import { createMetaSelector } from '../../redux/metadata/selectors';
import { useLocation } from 'react-router-dom';
import { uploadSong as uploadNewSong } from '../../services/song';
import { logout } from '../../redux/auth/authSlice';
import appRoutes from '../../constants/appRoutes';
import useUploadFile from '../../hooks/useUploadFile';
import useDeleteFile from '../../hooks/useDeleteFile';

interface Props {
  closeUploadModal: () => void;
}

const uploadSongMetadataSelector = createMetaSelector(uploadSong);

const UploadSongForm: React.FC<Props> = ({ closeUploadModal }) => {
  const [name, setName] = useState<string | null>(null);
  const [singerName, setSingerName] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [type, setType] = useState<'image' | 'audio'>('audio');
  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const delefile = useDeleteFile();

  const {
    handleUploadFile: handleUploadImage,
    isUploading: isUploadingImage,
    progress: imageProgress,
    url: thumbnail,
  } = useUploadFile(
    'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/3/2/a/3/32a35f4d26ee56366397c09953f6c269.jpg'
  );

  const {
    handleUploadFile: handleUploadAudio,
    isUploading: isUploadingAudio,
    progress: audioProgress,
    url: audioUrl,
  } = useUploadFile();

  const uploadSongMeta = useAppSelector(uploadSongMetadataSelector);

  const canSavedToDB = name && singerName && audioUrl && thumbnail && duration;

  const handleSaveSong = async () => {
    const isAtMusicPage =
      location.pathname === appRoutes.MYMUSIC ||
      location.pathname.includes(appRoutes.MYMUSIC_SONG);
    if (canSavedToDB) {
      if (isAtMusicPage) {
        dispatch(
          uploadSong({
            duration,
            name,
            singer_name: singerName,
            thumbnail,
            url: audioUrl,
          })
        ).then(() => {
          closeUploadModal();
        });
      } else {
        try {
          await uploadNewSong({
            duration,
            name,
            singer_name: singerName,
            thumbnail,
            url: audioUrl,
          });
          toast.success('Tải bài hát thành công');
          closeUploadModal();
        } catch (error: any) {
          if (error.response?.status === 403) {
            localStorage.removeItem('music_token');
            dispatch(logout());
          } else {
            toast.error(error.response?.data.msg);
          }
        }
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      const handleLoadedMetadata = () => {
        setDuration(Math.floor(audioRef.current?.duration ?? 0));
      };
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      return () => {
        audioRef.current?.removeEventListener(
          'loadedmetadata',
          handleLoadedMetadata
        );
      };
    }
  }, [audioUrl]);

  const handleClickInput = (type: 'image' | 'audio') => {
    setType(type);
    inputRef.current?.click();
  };

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const fileType = file.type;

    const prevThumbnail = thumbnail;
    const prevAudioUrl = audioUrl;

    if (type === 'image') {
      // upload image
      if (!allowedImageFormat.includes(fileType)) {
        toast.error('Định dạng ảnh không hỗ trợ');
        return;
      }

      toast.info('Một file đang được tải lên', { autoClose: 1500 });
      handleUploadImage(file, '/images/', () => {
        if (prevThumbnail) {
          delefile(prevThumbnail);
        }
      });
    } else {
      // upload audio
      if (!allowedAudioFormat.includes(fileType)) {
        toast.error('Định dạng audio không hỗ trợ');
        return;
      }

      toast.info('Một file đang được tải lên', { autoClose: 1500 });
      // setIsUploadingAudio(true);
      window.jsmediatags.read(file, {
        onSuccess(data) {
          console.log(data);
          setName(data.tags.title || null);
          setSingerName(data.tags.artist || null);
        },
        onError(error) {
          console.log(error);
        },
      });

      handleUploadAudio(file, '/audios/', () => {
        if (prevAudioUrl) {
          delefile(prevAudioUrl);
        }
      });
    }
  };

  return (
    <Container>
      <input type='file' onChange={handleSelectFile} hidden ref={inputRef} />
      {audioUrl && (
        <audio preload='metadata' hidden ref={audioRef} src={audioUrl} />
      )}

      <div className='btns-container'>
        <button onClick={() => handleClickInput('image')}>Upload Image</button>
        <button onClick={() => handleClickInput('audio')}>Upload Song</button>
      </div>

      <div className='progress-container'>
        {isUploadingImage && (
          <div className='progress-item'>
            <Progress value={imageProgress} />
          </div>
        )}

        {isUploadingAudio && (
          <div className='progress-item'>
            <Progress value={audioProgress} />
          </div>
        )}
      </div>

      <div className='uploaded-song'>
        <div className='song-left'>
          <div className='music-icon'>
            <FiMusic />
          </div>
          <div className='song-thumbnail'>
            <img src={thumbnail} alt='' />
            <div className='opacity'></div>
            <BsFillPlayFill className='play-state' />
          </div>
          <div className='song-info'>
            <h4 className='name'>{name ?? 'Song name'}</h4>
            <p className='singer'>{singerName ?? 'Singer'}</p>
          </div>
        </div>
        <div className='song-right'>
          <span className='duration'>{formatSongDuration(duration)}</span>
        </div>
      </div>

      {canSavedToDB ? (
        <div className='save-container'>
          <button
            disabled={
              isUploadingAudio || isUploadingImage || uploadSongMeta.pending
            }
            onClick={handleSaveSong}
          >
            {uploadSongMeta.pending ? 'Saving...' : 'Save Song'}
          </button>
        </div>
      ) : null}
    </Container>
  );
};

export default UploadSongForm;
