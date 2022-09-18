import apiEndpoints from '../constants/apiEndpoints';
import { AudioSong } from '../redux/audioPlayer/audioPlayerSlice';
import { privateClient } from './client';
import { Pagination } from './common';
import { Playlist } from './playlist';

export type SongPrivacy = 'private' | 'public';
export type AudioType = 'recommend' | 'next' | 'archive';
export interface Song {
  id: string;
  created_at?: Date | string;
  updated_at?: Date | string;
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

export interface Sentence {
  id: string;
  words: Word[];
}

export interface Lyric {
  status: number;
  sentences: Sentence[];
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

export interface GetUploadedSongParams {
  page: number;
  limit: number;
}
export interface GetUploadedSongResponse {
  songs: Song[];
  pagination: Pagination;
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
  song: AudioSong;
}

export interface GetSongLyricReponse {
  data: Lyric;
}

export interface GetHistorySongsParams {
  page: number;
  limit: number;
}
export interface GetHistorySongsResponse {
  data: Song[];
  pagination: Pagination;
}
export interface AddSongToHistoryParams {
  song_id: string;
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

export const getUploadedSong = async (
  params: GetUploadedSongParams
): Promise<GetUploadedSongResponse> => {
  const res = await privateClient.get<GetUploadedSongResponse>(
    apiEndpoints.GET_UPLOADED_SONG,
    { params }
  );

  return res.data;
};

export const getFavouriteSong = async (
  params: GetUploadedSongParams
): Promise<GetUploadedSongResponse> => {
  const res = await privateClient.get<GetUploadedSongResponse>(
    apiEndpoints.GET_FAVOURITE_SONG,
    { params }
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
    { params: { song_id: params.song.id } }
  );
  return res.data;
};

export const getHistorySongs = async (
  params: GetHistorySongsParams
): Promise<GetHistorySongsResponse> => {
  const res = await privateClient.get<GetHistorySongsResponse>(
    apiEndpoints.HISTORY_SONGS,
    { params }
  );

  return res.data;
};

export const addSongToHistory = async (
  params: AddSongToHistoryParams
): Promise<void> => {
  await privateClient.post<void>(apiEndpoints.HISTORY_SONGS, params);
};
