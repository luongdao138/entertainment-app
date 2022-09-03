import React, { useEffect, useMemo, useRef, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Container } from './style';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  changePlaylistFavourite,
  getPrivatePlaylists,
} from '../../../redux/playlist/playlistActions';
import {
  getLibraryPlaylist,
  getPrivatePlaylist,
} from '../../../redux/playlist/playlistSelector';
import { IoIosAddCircleOutline } from 'react-icons/io';
import PlaylistItem from '../../../components/PlaylistItem';
import { useUploadPlaylistContext } from '../../../context/UploadPlaylistContext';
import { Playlist } from '../../../services/playlist';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function LibraryPlaylist() {
  const [value, setValue] = useState(0);
  // const firstRenderRef = useRef<boolean>(false);
  const dispatch = useAppDispatch();
  const { openUploadPlaylistForm } = useUploadPlaylistContext();

  const private_playlists = useAppSelector(getPrivatePlaylist);
  const library_playlists = useAppSelector(getLibraryPlaylist);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleGetPlaylists = () => {
    dispatch(
      getPrivatePlaylists({
        is_own: value === 1,
      })
    );
  };

  const handleChangeFavouritePlaylist = (id: string) => {
    dispatch(changePlaylistFavourite({ id }));
  };

  useEffect(() => {
    // if (firstRenderRef.current) {
    //   firstRenderRef.current = false;
    //   return;
    // }

    handleGetPlaylists();
  }, [value]);

  const renderPlaylists = useMemo(() => {
    return (
      <div className='playlist-list'>
        <div className='empty-playlist' onClick={openUploadPlaylistForm}>
          <IoIosAddCircleOutline />
          <span>Tạo playlist mới</span>
        </div>
        {(value === 1 ? private_playlists : library_playlists).map(
          (playlist: Playlist) => (
            <PlaylistItem
              playlist={playlist}
              key={playlist.id}
              onClickLikePlaylist={() =>
                handleChangeFavouritePlaylist(playlist.id)
              }
              showChangeFavouriteConfirmModal
            />
          )
        )}
      </div>
    );
  }, [private_playlists, library_playlists, value]);

  return (
    <Container>
      <div className='header'>
        <h2 className='title'>Playlist</h2>
        <Tabs
          sx={{
            '& .MuiTab-root': {
              color: '#dadada',
              textTransform: 'uppercase',
              margin: '0 20px',
              fontSize: '14px',
              fontWeight: 500,
              minWidth: 'unset',
              padding: 0,
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'rgb(114, 0, 161)',
            },
            '& .MuiTab-root.Mui-selected': {
              color: '#fff',
            },
          }}
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab
            label='Tất cả'
            disableRipple
            disableTouchRipple
            {...a11yProps(0)}
          />
          <Tab
            label='Của tôi'
            disableRipple
            disableTouchRipple
            {...a11yProps(1)}
          />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        {renderPlaylists}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {renderPlaylists}
      </TabPanel>
    </Container>
  );
}
