import { Menu } from '@mui/material';
import React from 'react';
import { BsChevronRight } from 'react-icons/bs';
import { RiShareForwardLine } from 'react-icons/ri';
import { ImEmbed2 } from 'react-icons/im';
import { Container, ShareMenuContainer } from './style';
import useBoolean from '../../hooks/useBoolean';
import Modal from '../Modal';
import EmbedMusic from '../EmbedMusic';
import { FacebookIcon, FacebookShareButton } from 'react-share';

interface Props {
  is_song: boolean;
  id: string;
}

const MusicShare: React.FC<Props> = ({ id, is_song }) => {
  const {
    value: openEmbedModal,
    setTrue: handleOpenEmbedModal,
    setFalse: handleCloseEmbedModal,
  } = useBoolean();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openShareMenu = Boolean(anchorEl);
  const handleCloseShareMenu = () => {
    setAnchorEl(null);
  };
  const handleOpenShareMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onOpenEmbedMusic = () => {
    handleOpenEmbedModal();
    handleCloseShareMenu();
  };

  return (
    <>
      <Modal
        open={openEmbedModal}
        onClose={handleCloseEmbedModal}
        maxWidth='sm'
      >
        <EmbedMusic
          closeModal={handleCloseEmbedModal}
          id={id}
          is_song={is_song}
        />
      </Modal>
      <Container>
        <Menu
          id='music-share-menu'
          MenuListProps={{
            'aria-labelledby': 'music-share-button',
          }}
          anchorEl={anchorEl}
          open={openShareMenu}
          onClose={handleCloseShareMenu}
          sx={{
            '& .MuiList-root': {
              padding: 0,
            },
            '& .MuiPaper-root': {
              transform: 'translateY(6px) !important',
            },
          }}
          PaperProps={{
            sx: {
              padding: 0,
              background: 'none',
              boxShadow: 'none',
            },
          }}
        >
          <ShareMenuContainer>
            <ul>
              <FacebookShareButton
                style={{
                  width: '100%',
                  padding: '10px 20px 10px 14px',
                  fontSize: '14px',
                }}
                url={`${import.meta.env.VITE_CLIENT_URL}/${
                  is_song ? 'song' : 'playlist'
                }/${id}`}
                className='share-item'
                // quote='Dao Van Luong'
                // hashtag='#abc'
              >
                <FacebookIcon size={20} round />
                <span>Facebook</span>
              </FacebookShareButton>
              <li onClick={onOpenEmbedMusic} className='share-item'>
                <ImEmbed2 />
                <span>Mã nhúng</span>
              </li>
            </ul>
          </ShareMenuContainer>
        </Menu>
        <div
          className='share-main'
          aria-label='music-share'
          id='music-share-button'
          aria-controls={openShareMenu ? 'music-share-menu' : undefined}
          aria-expanded={openShareMenu ? 'true' : undefined}
          aria-haspopup='true'
          onClick={handleOpenShareMenu}
        >
          <RiShareForwardLine className='icon' />
          <span>Chia sẻ</span>
          <BsChevronRight className='arrow' />
        </div>
      </Container>
    </>
  );
};

export default MusicShare;
