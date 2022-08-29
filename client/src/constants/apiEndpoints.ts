const apiEndpoints = {
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  REFRESH_TOKEN: '/auth/refresh',
  LOGOUT: '/auth/logout',
  GET_USER_INFO: '/user',
  UPLOAD_SONG: '/song/upload',
  GET_UPLOADED_SONG: '/song/upload',
  GET_FAVOURITE_SONG: '/song/favourite',
  CHANGE_FAVOURITE: '/song/favourite/:id',
  UPDATE_PROFILE: '/user/updateProfile',
  RESET_PASSWORD: '/user/resetPassword',
};

export default apiEndpoints;
