import React, { useEffect, useRef } from 'react';
import SongList from '../../../../components/SongList';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { getFavouriteSong } from '../../../../redux/song/songActions';
import { getUsersFavouriteSongs } from '../../../../redux/song/songSelectors';
import { NoSongsContainer } from './style';
import emptyFavouriteIcon from '../../../../assets/empty-favourite.png';
import { Link } from 'react-router-dom';

const FavouriteSong = () => {
  const dispatch = useAppDispatch();
  // const firstRenderRef = useRef<boolean>(true);
  const songs = useAppSelector(getUsersFavouriteSongs);

  useEffect(() => {
    // if (firstRenderRef.current) {
    //   firstRenderRef.current = false;
    //   return;
    // }

    dispatch(getFavouriteSong());
  }, []);
  return songs.length === 0 ? (
    <NoSongsContainer>
      <img src={emptyFavouriteIcon} alt='' />
      <h3>Chưa có bài hát yêu thích trong thư viện cá nhân</h3>
      <Link to='/'>Khám phá ngay</Link>
    </NoSongsContainer>
  ) : (
    <SongList songs={songs} enable_select_multiple can_change_favourite_songs />
  );
};

export default FavouriteSong;
