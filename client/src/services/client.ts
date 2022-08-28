import axios from 'axios';
import { refreshToken } from './auth';

const client = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

client.defaults.withCredentials = true;

const privateClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

privateClient.interceptors.response.use(
  (res) => res,
  async (error: any) => {
    const prevRequest = error?.config;
    if (error.response.status === 403 && !prevRequest.sent) {
      prevRequest.sent = true;
      const res = await refreshToken();
      const new_access_token = res.access_token;
      prevRequest.headers['Authorization'] = `Bearer ${new_access_token}`;
      localStorage.setItem('music_token', new_access_token);

      return privateClient(prevRequest);
    }

    return Promise.reject(error);
  }
);

privateClient.interceptors.request.use(
  (config) => {
    if (config?.headers) {
      if (!config.headers?.['Authorization']) {
        // the first attempt
        config.headers['Authorization'] = `Bearer ${localStorage.getItem(
          'music_token'
        )}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export { privateClient, client };
