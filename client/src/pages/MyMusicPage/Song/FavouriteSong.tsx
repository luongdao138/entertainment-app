import React, { useEffect, useRef } from 'react';
import SongItem from '../../../components/SongItem';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getFavouriteSong } from '../../../redux/song/songActions';
import { getUsersFavouriteSongs } from '../../../redux/song/songSelectors';

const FavouriteSong = () => {
  const dispatch = useAppDispatch();
  const firstRenderRef = useRef<boolean>(true);
  const songs = useAppSelector(getUsersFavouriteSongs);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    dispatch(getFavouriteSong());
  }, []);
  return (
    <div>
      {songs.map((song) => (
        <SongItem song={song} key={song.id} />
      ))}
    </div>
  );
};

export default FavouriteSong;
