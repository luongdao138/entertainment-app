import apiEndpoints from '../constants/apiEndpoints';
import { privateClient } from './client';

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
  can_delete: boolean;
}

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
