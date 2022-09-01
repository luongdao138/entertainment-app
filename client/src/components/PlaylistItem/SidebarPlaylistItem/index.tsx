import React from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import appRoutes from '../../../constants/appRoutes';
import { Playlist } from '../../../services/playlist';
import { Container } from './style';

interface Props {
  playlist: Playlist;
}

const SidebarPlaylistItem: React.FC<Props> = ({ playlist }) => {
  return (
    <Container
      to={appRoutes.PLAYLIST_DETAIL.replace(':playlist_id', playlist.id)}
    >
      <span className='name'> {playlist.title}</span>

      <button className='more-btn'>
        <MdMoreHoriz />
      </button>
    </Container>
  );
};

export default SidebarPlaylistItem;
