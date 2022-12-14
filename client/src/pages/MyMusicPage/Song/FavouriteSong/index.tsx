import React, { useEffect, useRef } from 'react';
import SongList from '../../../../components/SongList';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { getFavouriteSong } from '../../../../redux/song/songActions';
import {
  getFavouriteSongsPaginationSelector,
  getUsersFavouriteSongs,
} from '../../../../redux/song/songSelectors';
import { NoSongsContainer } from './style';
import emptyFavouriteIcon from '../../../../assets/empty-favourite.png';
import { Link } from 'react-router-dom';
import { Song, SongDetail } from '../../../../services/song';
import _ from 'lodash';
import { useAudioContext } from '../../../../context/AudioContext';
import {
  resetFavouriteSongs,
  resetUploadedSongs,
} from '../../../../redux/song/songSlice';
import { clearMetaData } from '../../../../redux/metadata/actions';
import { createMetaSelector } from '../../../../redux/metadata/selectors';
import InfiniteScroll from 'react-infinite-scroll-component';
import SongItemSkeleton from '../../../../components/Skeleton/SongItem';

const getFavouriteSongsMetaSelector = createMetaSelector(getFavouriteSong);

const FavouriteSong = () => {
  const dispatch = useAppDispatch();
  // const firstRenderRef = useRef<boolean>(true);
  const songs = useAppSelector(getUsersFavouriteSongs);
  const favouriteSongMeta = useAppSelector(getFavouriteSongsMetaSelector);
  const { handleClickSongAudio } = useAudioContext();
  const { page, limit, total_count } = useAppSelector(
    getFavouriteSongsPaginationSelector
  );

  const total_songs_favourite = songs.length;

  const has_more_songs =
    total_songs_favourite < total_count && !favouriteSongMeta.pending;

  const fetchNextSongs = () => {
    if (has_more_songs) dispatch(getFavouriteSong({ limit, page: page + 1 }));
  };

  useEffect(() => {
    // if (firstRenderRef.current) {
    //   firstRenderRef.current = false;
    //   return;
    // }

    dispatch(getFavouriteSong({ page: 1, limit }));
    return () => {
      dispatch(clearMetaData(getFavouriteSong.typePrefix));
      dispatch(resetFavouriteSongs());
      dispatch(resetUploadedSongs());
    };
  }, []);

  const handleClickFavouriteSongAudio = (song: Song | SongDetail) => {
    handleClickSongAudio({
      song,
      playlist: null,
      list_songs: songs,
    });
  };

  return !favouriteSongMeta.pending && songs.length === 0 ? (
    <NoSongsContainer>
      <img src={emptyFavouriteIcon} alt='' />
      <h3>Ch??a c?? b??i h??t y??u th??ch trong th?? vi???n c?? nh??n</h3>
      <Link to='/'>Kh??m ph?? ngay</Link>
    </NoSongsContainer>
  ) : (
    <>
      <InfiniteScroll
        dataLength={total_songs_favourite}
        hasMore={has_more_songs}
        loader={null}
        next={fetchNextSongs}
        scrollThreshold={0.9}
      >
        <SongList
          onClickSongAudio={handleClickFavouriteSongAudio}
          songs={songs}
          enable_select_multiple
          can_change_favourite_songs
        />
      </InfiniteScroll>
      {favouriteSongMeta.pending && (
        <div className='skeleton-container'>
          {[...new Array(8)].map((_, index) => (
            <SongItemSkeleton key={index} />
          ))}
        </div>
      )}
    </>
  );
};

export default FavouriteSong;
