import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Container } from './style';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getPrivatePlaylists } from '../../../redux/playlist/playlistActions';
import {
  getLibraryPlaylist,
  getPrivatePlaylist,
} from '../../../redux/playlist/playlistSelector';
import { IoIosAddCircleOutline } from 'react-icons/io';
import PlaylistItem from '../../../components/PlaylistItem';
import { useUploadPlaylistContext } from '../../../context/UploadPlaylistContext';
import { Playlist } from '../../../services/playlist';
import PageTabs from '../../../components/PageTabs';

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

export default function LibraryPlaylist() {
  const [value, setValue] = useState(0);
  // const firstRenderRef = useRef<boolean>(false);
  const dispatch = useAppDispatch();
  const { openUploadPlaylistForm } = useUploadPlaylistContext();

  const private_playlists = useAppSelector(getPrivatePlaylist);
  const library_playlists = useAppSelector(getLibraryPlaylist);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  const handleGetPlaylists = () => {
    dispatch(
      getPrivatePlaylists({
        is_own: value === 1,
      })
    );
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
          <span>T???o playlist m???i</span>
        </div>
        {(value === 1 ? private_playlists : library_playlists).map(
          (playlist: Playlist) => (
            <PlaylistItem
              playlist={playlist}
              key={playlist.id}
              showChangeFavouriteConfirmModal
            />
          )
        )}
      </div>
    );
  }, [private_playlists, library_playlists, value]);

  return (
    <Container>
      {/* <div className='header'>
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
            label='T???t c???'
            disableRipple
            disableTouchRipple
            {...a11yProps(0)}
          />
          <Tab
            label='C???a t??i'
            disableRipple
            disableTouchRipple
            {...a11yProps(1)}
          />
        </Tabs>
      </div> */}
      <PageTabs
        title='Playlist'
        value={value}
        onChange={handleChange}
        options={[{ label: 'T???t c???' }, { label: 'C???a t??i' }]}
      />
      <TabPanel value={value} index={0}>
        {renderPlaylists}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {renderPlaylists}
      </TabPanel>
    </Container>
  );
}
