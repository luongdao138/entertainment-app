import React, { useEffect, useRef, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import appRoutes from '../../constants/appRoutes';
import { useUploadPlaylistContext } from '../../context/UploadPlaylistContext';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { clearMetaData } from '../../redux/metadata/actions';
import { createMetaSelector } from '../../redux/metadata/selectors';
import {
  createNewPlaylist,
  editPlaylist,
} from '../../redux/playlist/playlistActions';
import MySwitch from '../Switch';
import { Container } from './style';

interface Props {
  closeUploadModal: () => void;
}

const createPlaylistMetaSelector = createMetaSelector(createNewPlaylist);

const NewPlaylistForm: React.FC<Props> = ({ closeUploadModal }) => {
  const { isEdit, editedPlaylist } = useUploadPlaylistContext();
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [isPlayRandom, setIsPlayRandom] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('');
  const createPlaylistMeta = useAppSelector(createPlaylistMetaSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCreateNewPlaylist = () => {
    if (!title) {
      return;
    }

    if (isEdit) {
      if (editedPlaylist) {
        dispatch(
          editPlaylist({
            data: {
              data: {
                is_public: isPublic,
                play_random: isPlayRandom,
                title: title.trim(),
              },
              id: editedPlaylist?.id,
            },
            onSuccess: closeUploadModal,
          })
        );
      }
    } else {
      dispatch(
        createNewPlaylist({
          data: {
            is_public: isPublic,
            play_random: isPlayRandom,
            title: title.trim(),
          },
          onSuccess(id: string) {
            navigate(appRoutes.PLAYLIST_DETAIL.replace(':playlist_id', id));
          },
        })
      );
    }
  };

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      handleCreateNewPlaylist();
    }
  };

  useEffect(() => {
    titleInputRef.current?.focus();
    return () => {
      if (isEdit) {
        dispatch(clearMetaData(editPlaylist.typePrefix));
      } else {
        dispatch(clearMetaData(createNewPlaylist.typePrefix));
      }
    };
  }, []);

  useEffect(() => {
    if (createPlaylistMeta.loaded) {
      toast.success('T???o playlist m???i th??nh c??ng');
      closeUploadModal();
    } else if (createPlaylistMeta.error) {
      toast.error('T???o playlist th???t b???i');
    }
  }, [createPlaylistMeta]);

  useEffect(() => {
    if (isEdit && editedPlaylist) {
      setTitle(editedPlaylist.title);
      setIsPlayRandom(editedPlaylist.play_random);
      setIsPublic(editedPlaylist.privacy === 'public');
    }

    return () => {
      setTitle('');
      setIsPlayRandom(true);
      setIsPublic(true);
    };
  }, [isEdit, editedPlaylist?.id]);

  return (
    <Container>
      <button onClick={closeUploadModal} className='close-btn'>
        <MdClose />
      </button>
      <h2 className='title'>T???o playlist m???i</h2>
      <input
        ref={titleInputRef}
        type='text'
        value={title}
        onChange={handleTitleChange}
        placeholder='Nh???p t??n playlist'
        onKeyUp={handleOnKeyUp}
      />
      <div className='switch'>
        <MySwitch
          setValue={setIsPublic}
          value={isPublic}
          title='C??ng khai'
          desc='M???i ng?????i c?? th??? nh??n th???y playlist n??y'
        />
      </div>
      <div className='switch'>
        <MySwitch
          setValue={setIsPlayRandom}
          value={isPlayRandom}
          title='Ph??t ng???u nhi??n'
          desc='Lu??n ph??t ng???u nhi??n t???t c??? b??i h??t'
        />
      </div>
      <button
        onClick={handleCreateNewPlaylist}
        disabled={!title || createPlaylistMeta.pending}
        className='create-btn'
      >
        {isEdit ? 'L??u' : 'T???o m???i'}
      </button>
    </Container>
  );
};

export default NewPlaylistForm;
