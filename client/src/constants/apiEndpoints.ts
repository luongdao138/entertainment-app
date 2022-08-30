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
};

export default apiEndpoints;
