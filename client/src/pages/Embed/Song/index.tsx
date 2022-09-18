import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getSongDetail, SongDetail } from '../../../services/song';
import { Container } from './style';

const SongEmbedPage = () => {
  const [searchParams] = useSearchParams();
  const { song_id } = useParams();
  const auto_play = searchParams.get('start') || 'false';
  const [song, setSong] = useState<SongDetail | null>(null);

  useEffect(() => {
    const getSongInfo = async () => {
      try {
        const res = await getSongDetail({ song_id: song_id ?? '' });
        setSong(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getSongInfo();
  }, [song_id]);

  if (!song) return null;

  return (
    <Container>
      <div
        className='song-background'
        style={{
          backgroundImage: `url(${song.thumbnail})`,
        }}
      ></div>
      <div className='song-blur'></div>
      <div className='song-container'>
        <div className='song-header'>
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
            to={`/song/${song.id}`}
            className='song-thumbnail'
          >
            <img src={song.thumbnail} alt='' />
          </Link>
          <div className='song-info'>
            <Link target='_blank' to={`/song/${song.id}`} className='song-name'>
              {song.name}
            </Link>
            <p className='singer-name'>{song.singer_name}</p>
            <p className='genre'>
              {song.belong_categories.map((bc) => bc.name).join(', ')}
            </p>
          </div>
        </div>

        <Link target='_blank' to={`/song/${song.id}`} className='song-btn'>
          <button>Nghe nhạc chất lượng cao trên Zing MP3</button>
        </Link>
      </div>
    </Container>
  );
};

export default SongEmbedPage;
