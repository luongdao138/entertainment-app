import apiEndpoints from '../constants/apiEndpoints';
import { privateClient } from './client';
import { Playlist } from './playlist';

export type SongPrivacy = 'private' | 'public';
export type AudioType = 'recommend' | 'next' | 'archive';
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
  user_id?: string;
  // audio_type?: AudioType;
  has_lyric?: boolean;
  lyric: { id: string } | null;

  queue_id?: string;
  is_current_audio?: boolean;
  queue_playlist_id?: string | null;
}

export interface SongDetail extends Song {
  user: {
    id: string;
    profile_photo: string;
    full_name: string;
  };
  belong_categories: { id: string; name: string }[];
}
export interface Word {
  start_time: number;
  end_time: number;
  data: string;
}
export interface Lyric {
  status: number;
  sentences: {
    words: Word[];
  }[];
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
export interface GetSongDetailParams {
  song_id: string;
}
export interface GetSongDetailResponse {
  data: SongDetail;
  recommended_songs: Song[];
  feature_playlists: Playlist[];
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

export interface GetRecommendedSongParams {
  song_id: string;
  data: {
    exclude_song_ids: string[];
  };
}
export interface GetRecommendedSongResponse {
  songs: Song[];
}

export interface GetSongLyricParams {
  song_id: string;
}

export interface GetSongLyricReponse {
  data: Lyric;
}

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

export const getSongDetail = async (
  params: GetSongDetailParams
): Promise<GetSongDetailResponse> => {
  const res = await privateClient.get<GetSongDetailResponse>(
    apiEndpoints.GET_SONG_DETAIL.replace(':song_id', params.song_id)
  );

  return res.data;
};

export const getRecommendedSongs = async (
  params: GetRecommendedSongParams
): Promise<GetRecommendedSongResponse> => {
  const res = await privateClient.post<GetRecommendedSongResponse>(
    apiEndpoints.GET_RECOMMENDED_SONGS.replace(':song_id', params.song_id),
    params.data
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

export const getSongLyric = async (
  params: GetSongLyricParams
): Promise<GetSongLyricReponse> => {
  const res = await privateClient.get<GetSongLyricReponse>(
    apiEndpoints.GET_SONG_LYRIC,
    { params }
  );
  return res.data;
};
