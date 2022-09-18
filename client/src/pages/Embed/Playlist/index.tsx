import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { DEFAULT_PLAYLIST_THUMBNAIL } from '../../../constants/images';
import {
  getAllSongsOfPlaylist,
  getPlaylistDetail,
  PlaylistDetail,
} from '../../../services/playlist';
import { Song } from '../../../services/song';
import { formatTimeNumber } from '../../../utils/formatTime';
import { Container } from './style';

const PlaylistEmbedPage = () => {
  const [searchParams] = useSearchParams();
  const { playlist_id } = useParams();
  const auto_play = searchParams.get('start') || 'false';
  const [playlist, setPlaylist] = useState<PlaylistDetail | null>(null);
  const [playlist_songs, setPlaylistSongs] = useState<Song[]>([]);

  useEffect(() => {
    const getPlaylistInfo = async () => {
      try {
        const res = await getPlaylistDetail({ playlist_id: playlist_id ?? '' });
        const res_songs = await getAllSongsOfPlaylist({
          playlist_id: playlist_id ?? '',
        });
        setPlaylist(res.playlist);
        setPlaylistSongs(res_songs.songs);
      } catch (error) {
        console.log(error);
      }
    };

    getPlaylistInfo();
  }, [playlist_id]);

  if (!playlist) return null;

  const playlist_thumbnail =
    playlist_songs[0]?.thumbnail ?? DEFAULT_PLAYLIST_THUMBNAIL;

  return (
    <Container>
      <div
        className='song-background'
        style={{
          backgroundImage: `url(${playlist_thumbnail})`,
        }}
      ></div>
      <div className='song-blur'></div>
      <div className='song-container'>
        <div className='song-header'>
          <p className='playlist-name'>{playlist.title}</p>
          <Link to='logo'>
            <img
              src='https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg'
              alt='logo'
            />
          </Link>
        </div>
        <div className='song-content'>
          <Link
            target='_blank'
            to={`/playlist/${playlist.id}`}
            className='song-thumbnail'
          >
            <img src={playlist_thumbnail} alt='' />
          </Link>
          <div className='song-info'>
            {playlist_songs.map((song, index) => (
              <Link
                key={song.id}
                to={`/playlist/${playlist.id}?song_id=${song.id}`}
                target='_blank'
                className='song-item'
              >
                <span className='index'>{formatTimeNumber(index + 1)}. </span>
                <span className='song-name'> {song.name}</span>
                <span className='singer-name'> - {song.singer_name}</span>
              </Link>
            ))}
          </div>
        </div>

        <Link
          target='_blank'
          to={`/playlist/${playlist.id}`}
          className='song-btn'
        >
          <button>Nghe nhạc chất lượng cao trên Zing MP3</button>
        </Link>
      </div>
    </Container>
  );
};

export default PlaylistEmbedPage;
