import apiEndpoints from '../constants/apiEndpoints';
import { privateClient } from './client';

export type SongPrivacy = 'private' | 'public';
export interface Song {
  id: string;
  created_at: Date | string;
  updated_at: Date | string;
  name: string;
  url: string;
  duration: number;
  thumbnail: string;
  singer_name: string;
  is_liked: boolean;
  privacy?: SongPrivacy;
  position?: number;
  belong_categories: { id: string }[];
}

export interface UploadSongParams {
  name: string;
  url: string;
  duration: number;
  thumbnail: string;
  singer_name: string;
}

export interface UploadSongResponse {
  song: Song;
}

export interface GetUploadedSongResponse {
  songs: Song[];
}

export type EditSongParams = {
  id: string;
  data: {
    name?: string;
    singer_name?: string;
    privacy?: SongPrivacy;
    categories?: string[];
    thumbnail?: string;
  };
};

export const uploadSong = async (
  params: UploadSongParams
): Promise<UploadSongResponse> => {
  const res = await privateClient.post<UploadSongResponse>(
    apiEndpoints.UPLOAD_SONG,
    params
  );

  return res.data;
};

export const getUploadedSong = async (): Promise<GetUploadedSongResponse> => {
  const res = await privateClient.get<GetUploadedSongResponse>(
    apiEndpoints.GET_UPLOADED_SONG
  );

  return res.data;
};

export const getFavouriteSong = async (): Promise<GetUploadedSongResponse> => {
  const res = await privateClient.get<GetUploadedSongResponse>(
    apiEndpoints.GET_FAVOURITE_SONG
  );

  return res.data;
};

export const changeFavourite = async (params: string) => {
  const res = await privateClient.put(
    apiEndpoints.CHANGE_FAVOURITE.replace(':id', params)
  );
  return res.data;
};

export const editSong = async (params: EditSongParams) => {
  const res = await privateClient.put(
    apiEndpoints.EDIT_SONG.replace(':song_id', params.id),
    params.data
  );
  return res.data;
};

export const deleteUploadSong = async (params: string) => {
  const res = await privateClient.delete(
    apiEndpoints.DELETE_UPLOAD_SONG.replace(':song_id', params)
  );
  return res.data;
};
