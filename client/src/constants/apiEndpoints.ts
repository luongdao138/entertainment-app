const apiEndpoints = {
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  REFRESH_TOKEN: '/auth/refresh',
  LOGOUT: '/auth/logout',
  RESEND_VERIFY_EMAIL: '/auth/resendVerify',
  FORGOT_PASSWORD: '/auth/forgotPassword',
  CHANGE_PASSWORD: '/auth/changePassword',
  VERIFY_EMAIL: '/auth/verifyEmail',
  GET_USER_INFO: '/user',
  UPLOAD_SONG: '/song/upload',
  GET_UPLOADED_SONG: '/song/upload',
  GET_FAVOURITE_SONG: '/song/favourite',
  CHANGE_FAVOURITE: '/song/favourite/:id',
  UPDATE_PROFILE: '/user/updateProfile',
  RESET_PASSWORD: '/user/resetPassword',
  CREATE_NEW_PLAYLIST: '/playlist',
  GET_PRIVATE_PLAYLIST: '/playlist/private',
  EIDT_PLAYLIST: '/playlist/:playlist_id',
  DELETE_PLAYLIST: '/playlist/:playlist_id',
  CHANGE_PLAYLIST_FAVOURITE: '/playlist/favourite/:playlist_id',
  ADD_SONGS_TO_PLAYLIST: '/playlist/addSong',
  REMOVE_SONGS_OUT_OF_PLAYLIST: '/playlist/removeSong',
  GET_SONGS_OF_PLAYLIST: '/playlist/getSong/:playlist_id',
  CHANGE_POSITION_PLAYLIST_SONGS: '/playlist/changeSongPosition',
  GET_PLAYLIST_DETAIL: '/playlist/:playlist_id',
  GET_ALL_CATEGORIES: '/category',
  EDIT_SONG: '/song/:song_id',
  GET_SONG_DETAIL: '/song/:song_id',
  DELETE_UPLOAD_SONG: '/song/:song_id',
  GET_RECOMMENDED_PLAYLIST_SONGS: '/playlist/recommend/:playlist_id',
  GET_RECOMMENDED_SONGS: '/song/recommend/:song_id',
};

export default apiEndpoints;
