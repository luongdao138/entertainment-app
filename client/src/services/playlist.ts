import apiEndpoints from '../constants/apiEndpoints';
import { privateClient } from './client';
import { Song } from './song';

export interface Playlist {
  id: string;
  title: string;
  thumbnail: string;
  creator: {
    full_name: string;
    id: string;
  };
  privacy: 'private' | 'public';
  play_random: boolean;
  created_at: Date;
  updated_at: Date;
  public_at: Date;
  is_owner: boolean;
  can_edit: boolean;
  is_liked?: boolean;
  can_delete: boolean;
  has_songs: { song: { thumbnail: string } }[];
}

export interface PlaylistDetail extends Playlist {}

export interface CreatePlaylistParams {
  title: string;
  play_random: boolean;
  is_public: boolean;
}

export interface CreatePlaylistResponse {
  play_list: Playlist;
}

export interface GetPrivatePlaylistParams {
  page?: number;
  limit?: number;
  is_own?: boolean;
}

export interface GetPrivatePlaylistResponse {
  playlists: Playlist[];
}

export interface UpdatePlaylistParams {
  id: string;
  data: {
    title: string;
    play_random: boolean;
    is_public: boolean;
  };
}

export interface DeletePlaylistParams {
  id: string;
}

export interface ChangePlaylistFavouriteParams {
  id: string;
}
export interface UpdatePlaylistSongsParams {
  song_id: string;
  playlist_id: string;
}
export interface GetSongsOfPlaylistParams {
  playlist_id: string;
}
export interface GetSongsOfPlaylistResponse {
  songs: Song[];
}
export interface ChangeSongPositionInPlaylistParams {
  playlist_id: string;
  new_songs: string[];
  // source_song_id: string;
  // destination_song_id: string;
}
export interface GetPlaylistDetailParams {
  playlist_id: string;
}
export interface GetPlaylistDetailResponse {
  playlist: PlaylistDetail;
}

export const createNewPlaylist = async (
  params: CreatePlaylistParams
): Promise<CreatePlaylistResponse> => {
  const res = await privateClient.post(
    apiEndpoints.CREATE_NEW_PLAYLIST,
    params
  );

  return res.data;
};

export const getPrivatePlaylists = async (
  params: GetPrivatePlaylistParams
): Promise<GetPrivatePlaylistResponse> => {
  const res = await privateClient.get<GetPrivatePlaylistResponse>(
    apiEndpoints.GET_PRIVATE_PLAYLIST,
    {
      params,
    }
  );

  return res.data;
};

export const updatePlaylist = async (params: UpdatePlaylistParams) => {
  const res = await privateClient.put(
    apiEndpoints.EIDT_PLAYLIST.replace(':playlist_id', params.id),
    params.data
  );

  return res.data;
};

export const deletePlaylist = async (params: DeletePlaylistParams) => {
  const res = await privateClient.delete(
    apiEndpoints.DELETE_PLAYLIST.replace(':playlist_id', params.id)
  );

  return res.data;
};

export const changePlaylistFavourite = async (
  params: ChangePlaylistFavouriteParams
): Promise<{ msg: string }> => {
  const res = await privateClient.put(
    apiEndpoints.CHANGE_PLAYLIST_FAVOURITE.replace(':playlist_id', params.id)
  );

  return res.data;
};

export const addSongToPlaylist = async (params: UpdatePlaylistSongsParams) => {
  const res = await privateClient.post(
    apiEndpoints.ADD_SONGS_TO_PLAYLIST,
    params
  );

  return res.data;
};

export const removeSongOutOfPlaylist = async (
  params: UpdatePlaylistSongsParams
) => {
  const res = await privateClient.post(
    apiEndpoints.REMOVE_SONGS_OUT_OF_PLAYLIST,
    params
  );

  return res.data;
};

export const getAllSongsOfPlaylist = async (
  params: GetSongsOfPlaylistParams
): Promise<GetSongsOfPlaylistResponse> => {
  const res = await privateClient.get<GetSongsOfPlaylistResponse>(
    apiEndpoints.GET_SONGS_OF_PLAYLIST.replace(
      ':playlist_id',
      params.playlist_id
    )
  );

  return res.data;
};

export const changeSongPositionInPlaylist = async (
  params: ChangeSongPositionInPlaylistParams
) => {
  const res = await privateClient.put(
    apiEndpoints.CHANGE_POSITION_PLAYLIST_SONGS,
    params
  );

  return res.data;
};

export const getPlaylistDetail = async (
  params: GetSongsOfPlaylistParams
): Promise<GetPlaylistDetailResponse> => {
  const res = await privateClient.get<GetPlaylistDetailResponse>(
    apiEndpoints.GET_PLAYLIST_DETAIL.replace(':playlist_id', params.playlist_id)
  );

  return res.data;
};
