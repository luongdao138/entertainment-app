import apiEndpoints from '../constants/apiEndpoints';
import { privateClient } from './client';
import { Pagination } from './common';
import { Song } from './song';

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

export interface DeleteSongOutHistoryParams {
  song_id: string;
}

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

export const deleteSongOutOfHistory = async (
  params: DeleteSongOutHistoryParams
): Promise<void> => {
  await privateClient.delete<void>(
    apiEndpoints.DELETE_HISTORY_SONG.replace(':song_id', params.song_id)
  );
};
