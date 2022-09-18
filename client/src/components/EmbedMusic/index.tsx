import { Menu } from '@mui/material';
import React, { useState } from 'react';
import { MdClose, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { toast } from 'react-toastify';
import useBoolean from '../../hooks/useBoolean';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import { Container, EmbedSizeMenu } from './style';

interface Props {
  closeModal: () => void;
  is_song: boolean;
  id: string;
}

interface Size {
  id: number;
  width: number;
  height: number;
}

const sizeOptions: Size[] = [
  {
    id: 1,
    width: 640,
    height: 180,
  },
  {
    id: 2,
    width: 640,
    height: 390,
  },
  {
    id: 3,
    width: 853,
    height: 240,
  },
];

function convertSize(size: Size) {
  return `${size.width}x${size.height}`;
}

const EmbedMusic: React.FC<Props> = ({ closeModal, id, is_song }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openSizeMenu = Boolean(anchorEl);
  const handleOpenSizeMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseSizeMenu = () => {
    setAnchorEl(null);
  };

  const [size, setSize] = useState<number>(1);
  const { value: auto_play, setValue: setAutoPlay } = useBoolean();
  const [, copy] = useCopyToClipboard();

  const current_size =
    sizeOptions.find((so) => so.id === size) ?? sizeOptions[0];

  const handleSelectSize = (id: number) => {
    setSize(id);
    handleCloseSizeMenu();
  };

  const handleChangeAutoPlay = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutoPlay(e.target.checked);
  };

  const current_url = `<iframe scrolling="no" width="${
    current_size.width
  }" height="${current_size.height}" src="${
    import.meta.env.VITE_CLIENT_URL
  }/embed/${is_song ? 'song' : 'playlist'}/${id}?start=${
    auto_play ? 'true' : 'false'
  }" frameborder="0" allowfullscreen="true"/>`;

  const handleCopyUrl = () => {
    copy(current_url).then(() => {
      toast.success('Sao chép thành công');
    });
  };

  return (
    <Container>
      <Menu
        id='embed-size-menu'
        MenuListProps={{
          'aria-labelledby': 'embed-size-button',
        }}
        anchorEl={anchorEl}
        open={openSizeMenu}
        onClose={handleCloseSizeMenu}
        sx={{
          '& .MuiList-root': {
            padding: 0,
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
        <EmbedSizeMenu>
          <ul>
            {sizeOptions.map((so) => (
              <li key={so.id} onClick={() => handleSelectSize(so.id)}>
                <span>{convertSize(so)}</span>
              </li>
            ))}
          </ul>
        </EmbedSizeMenu>
      </Menu>
      <div className='embed-header'>
        <h2 className='title'>Mã nhúng</h2>
        <MdClose onClick={closeModal} />
      </div>

      <div className='embed-main'>
        <div className='embed-url'>{current_url}</div>

        <div className='embed-config'>
          <div className='embed-size'>
            Kích thước
            <button
              aria-label='more'
              id='embed-size-button'
              aria-controls={openSizeMenu ? 'embed-size-menu' : undefined}
              aria-expanded={openSizeMenu ? 'true' : undefined}
              aria-haspopup='true'
              onClick={handleOpenSizeMenu}
            >
              {convertSize(current_size)} <MdOutlineKeyboardArrowDown />
            </button>
          </div>

          <div className='embed-autoplay'>
            <input
              type='checkbox'
              checked={auto_play}
              onChange={handleChangeAutoPlay}
            />
            <span>Tự động chơi</span>
          </div>
        </div>
      </div>

      <div className='embed-btn'>
        <button onClick={handleCopyUrl}>Sao chép</button>
      </div>
    </Container>
  );
};

export default EmbedMusic;
